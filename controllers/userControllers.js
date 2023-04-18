const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.sendStatus(400));
  },

  getUserById({ params }, res) {
    User.findById(params.id)
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found, try again" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.sendStatus(400));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found, try again" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user, try again" });
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and thoughts have been deleted" });
      })
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found, try again" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found, try again" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
