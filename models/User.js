const { Schema, model } = require("mongoose");

const userSchemaOptions = {
  toJSON: { virtuals: true },
};

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, trim: true, required: "Username is Required" },
    email: {
      type: String,
      unique: true,
      required: "Username is Required",
      match: [/.+@.+\..+/],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  userSchemaOptions
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
