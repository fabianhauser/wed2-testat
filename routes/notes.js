var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var DbalNotes = require('../dbal/notes.js');

/*
 * Init notes storage
 */

var db = new Datastore({
  filename: '../notes.db',
  autoload: true,
  timestampData: true // autoadd createdAt & updatedAt timestamp fields
});
var notes = new DbalNotes(db);

/*
 * Do actual routing
 */

/* notes listing */
router.post('/', function(req, res, next) {
  console.log("TODO: Set user view configuration  as cookie " +
    "& pass to next"); //TODO
  next();
});

router.get('/', function(req, res, next) {
  var orderBy = "_id";
  var filterBy = null;
  notes.getNotes(orderBy, filterBy, function(err, data){
    if(err) {
      console.log("Database error: ", err);
      //TODO: View nice error page
    }
    res.render('notes', {'notes': data });
  });
});


/* new note */
router.get('/new', function(req, res, next) {
  res.render('notes-new', {});
});

router.post('/new', function(req, res, next) {
  var noteData = null; //TODO: Fill this with form data
  notes.createNote(noteData, function(err){
    if(err) {
      console.log("Database error: ", err);
      //TODO: View nice error page
    }
    res.redirect(302, '/');
  });
});


/* edit note */
router.get('/:id', function(req, res, next) {
  var noteId = null; //TODO: Fill this with form data
  notes.getNote(noteId, function(err, data){
    if(err) {
      console.log("Database error: ", err);
      //TODO: View nice error page
    }
    res.render('notes-edit', { note: data });
  });
});

router.post('/:id', function(req, res, next) {
  var noteId = null; //TODO: Fill with form data
  var noteData = null; // TODO: Fill with form data

  notes.updateNote(noteId, noteData, function(err){
    if(err) {
      console.log("Database error: ", err);
      //TODO: View nice error page
    }
    res.redirect(302, '/');
  });
});

module.exports = router;
