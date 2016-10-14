/**
 * Created by michi on 14.10.16.
 */
var store = require("../services/noteStore.js");
var configurator = require("../util/configurator.js");

module.exports.getIndex = function(req, res)
{
    res.redirect(302, '/notes/');
};

/** Note list */

// Set new filter configuration
module.exports.reloadNotes = function(req, res, next) {
    configurator(req, res);
    next();
};

module.exports.getNotes = function(req, res, next) {
    var config = configurator(req, res);

    store.getNotes(config.notes.orderBy, config.notes.filterBy, function(err, data){
        if(err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.render('notes', {'notes': data });
    });
};

/** Edit Note */
module.exports.getNote = function(req, res, next) {
    var noteId = req.params.id;
    store.getNote(noteId, function(err, data){
        if(err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.render('notes-edit', { note: data });
    });
};

module.exports.setNote = function(req, res, next) {
  var noteId = req.params.id;
  var noteData = {
    title: req.params.title,
    description: req.paramts.description,
    rating: req.params.rating,
    finished: req.params.finished,
    dueDate: req.params.dueDate
  };

  store.setNote(noteId, noteData, function(err){
      if(err) {
          console.log("Database error: ", err);
          next(err);
      }
      res.redirect(302, '/');
  });
};

/** New Note */
module.exports.createNewNote = function(req, res, next) {
    res.render('notes-new', {});
};

module.exports.createNote = function(req, res, next) {
  var noteData = {
    title: req.params.title,
    description: req.paramts.description,
    rating: req.params.rating,
    finished: req.params.finished,
    dueDate: req.params.dueDate
  };

  store.createNote(noteData, function(err){
    if(err) {
      console.log("Database error: ", err);
      next(err);
    }
    res.redirect(302, '/');
  });
};