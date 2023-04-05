const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/userControllers');

router
    .route('/users')
    .get(getUsers).post(createUser)


module.exports = router;