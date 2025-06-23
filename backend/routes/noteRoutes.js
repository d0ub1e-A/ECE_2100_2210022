const express = require('express');
const { newNote, allNote, oneNote, updateNote, deleteNote, pinNote } = require('../controllers/note');
const authAccessToken = require('../middlewares/authAccessToken');
const router = express.Router();

router.use('/', authAccessToken);

router.post('/', newNote);
router.get('/', allNote);

router.get('/:id', oneNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

router.patch('/:id/pin', pinNote);


module.exports = router;
