const { User } = require('../models');

module.exports = {

    createUser(req,res) {
        User.create(req.body).then(data=>res.json(data))
    },
    
    getUsers(req,res) {
        User.find().select('-__v').then(data => res.json(data))
    }
};
