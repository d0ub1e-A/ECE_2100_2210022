const express = require('express');
const { getUser, updateUser, deleteUser, updateUserPass } = require('../controllers/user');
const authAccessToken = require('../middlewares/authAccessToken');
const router = express.Router();

router.use('/', authAccessToken);

router.get('/', getUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);

router.patch('/password', updateUserPass);


module.exports = router;
