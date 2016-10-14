var express = require('express');
var router = express.Router();

var noteController = require('../controller/noteController.js');

/* root routing */
router.get('/', noteController.showIndex);

/* notes listing */
router.get('/notes', noteController.showNotes);
router.post('/notes', noteController.reloadNotes);

/* edit note */
router.get('/notes/:id', noteController.showEditNote);
router.post('/notes/:id', noteController.editNote);

/* new note */
router.get('/notes/new', noteController.showNewNote);
router.post('/notes/new', noteController.newNote);


module.exports = router;
