/**
 * Created by michi on 14.10.16.
 */
var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res)
{
    res.redirect(302, '/notes/');
};

/** New Note */
module.exports.showNewNote = function(req, res, next) {
    res.render('notes-new', {});
};

module.exports.newNote = function(req, res, next) {
    var noteData = null; //TODO: Fill this with form data
    notes.createNote(noteData, function(err){
        if(err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.redirect(302, '/');
    });
};

/** Edit Note */
module.exports.showEditNote = function(req, res, next) {
    var noteId = null; //TODO: Fill this with form data
    notes.getNote(noteId, function(err, data){
        if(err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.render('notes-edit', { note: data });
    });
};

module.exports.editNote = function(req, res, next) {
    var noteId = null; //TODO: Fill with form data
    var noteData = null; // TODO: Fill with form data

    notes.updateNote(noteId, noteData, function(err){
        if(err) {
            console.log("Database error: ", err);
            next(err);
        }
        res.redirect(302, '/');
    });
};

/** Note list */
module.exports.showNotes = function(req, res, next) {
    /*
     * Set sorting cookie on first call
     */


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
};

module.exports.reloadNotes = function(req, res, next) {
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
};