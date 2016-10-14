var express = require('express');
var router = express.Router();
var DbalNotes = require('../dbal/notes.js');

/*
 * Do actual routing
 */

/* notes listing */
router.post('/', function(req, res, next) {
  var configuration = req.cookies.configuration;

  if (configuration === undefined) {
    configuration = {
      notes: {}
    };
  }

  configuration.notes = {
    orderBy: req.params.orderBy,
    filterBy: req.params.filterBy
  };
  var confStringify = JSON.stringify(configuration);
  req.cookies.configuration = confStringify;
  res.cookie('configuration', confStringify, { maxAge: 900000, httpOnly: true });
  next();
});

router.get('/', function(req, res, next) {
  /*
   * Set sorting cookie on first call
   */
  var configuration = JSON.parse(req.cookies.configuration);

    res.cookie('configuration', JSON.stringify(configuration), { maxAge: 900000, httpOnly: true });
  }

  /*
   * Get and render notes
   */
  var orderBy = configuration.notes.orderBy; // TODO: Validate this.
  var filterBy = configuration.notes.filterBy; // TODO: Validate this.
  notes.getNotes(orderBy, filterBy, function(err, data){
    if(err) {
      console.log("Database error: ", err);
      next(err);
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
      next(err);
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
      next(err);
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
      next(err);
    }
    res.redirect(302, '/');
  });
});

module.exports = router;
