/**
 * Created by michi on 14.10.16.
 */
var store = require("../services/noteStore.js");
var configurator = require("../util/configurator.js");

module.exports.getIndex = function (req, res) {
    res.redirect(302, '/notes/');
};

/** Note list */

module.exports.getNotes = function (req, res, next) {
    var config = configurator(req, res);
    store.getNotes(config.notes.orderBy, config.notes.filterBy, function (err, data) {
        if (err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.render('notes', {'notes': data, 'config': config});
    });
};

/** Edit Note */
module.exports.getNote = function (req, res, next) {
    var config = configurator(req, res);
    var noteId = req.params.id;
    console.log(noteId);
    store.getNote(noteId, function (err, data) {
        if (err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.render('notes-edit', {note: data, 'config': config});
    });
};

module.exports.setNote = function (req, res, next) {
    var config = configurator(req, res);
    var noteId = req.params.id;
    var noteData = {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        finished: req.body.finished ? true : false,
        dueDate: req.body.dueDate
    };

    store.setNote(noteId, noteData, function (err) {
        if (err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.redirect(302, '/');
    });
};

/** New Note */
module.exports.createNewNote = function (req, res, next) {
    var config = configurator(req, res);
    res.render('notes-new', {'config': config});
};

module.exports.createNote = function (req, res, next) {
    var noteData = {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        finished: req.body.finished ? true : false,
        dueDate: req.body.dueDate
    };

    store.createNote(noteData, function (err) {
        if (err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.redirect(302, '/');
    });
};
