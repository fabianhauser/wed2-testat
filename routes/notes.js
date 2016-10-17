var express = require('express');
var router = express.Router();

var noteController = require('../controller/noteController.js');

/* root routing */
router.get('/', noteController.getIndex);

/* edit note */
router.get('/notes/:id', noteController.getNote);
router.post('/notes/:id', noteController.setNote);

/* notes listing */
router.get('/notes', noteController.getNotes);

/* new note */
router.get('/notes/new', noteController.createNewNote);
router.post('/notes/new', noteController.createNote);



module.exports = router;
