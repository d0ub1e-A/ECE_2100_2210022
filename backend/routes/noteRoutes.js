const express = require('express');
const { newNote, allNote, oneNote, updateNote, deleteNote } = require('../controllers/note');
const authAccessToken = require('../middlewares/authAccessToken');
const router = express.Router();

router.use('/', authAccessToken);

router.post('/', newNote);
router.get('/', allNote);

router.get('/:id', oneNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
