var Datastore = require('nedb');
var db = new Datastore({
    filename: '../data/notes.db',
    autoload: true,
    timestampData: true // autoadd createdAt & updatedAt timestamp fields
});

function Note(noteData) {
    this.title = noteData['title'];
    this.description = noteData['description'];
    this.rating = noteData['rating'];
    this.dueDate = noteData['dueDate'];
    this.finished = noteData['finished'];
}

function createNote(noteData, callback) {
    var newNote = new Note(noteData);

    db.insert(newNote, function (err, newNote) {
        if (callback) {
            callback(err, newNote);
        }
    });
}

function getNote(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}


function getAllNotes() {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {all: getAllNotes};