var Datastore = require('nedb');
var db = new Datastore({
    filename: 'data/notes.db',
    autoload: true,
    timestampData: true // autoadd createdAt & updatedAt timestamp fields
});

function Note(noteData) {
    console.log(noteData['title']);
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


function getNotes(orderBy, filterBy, next) {
  db.count({}, function (err, count) {
    if(err) return next(err);
    if(count === 0) return next(null, null);

    if(filterBy) {
	filterBy = { finished: false };
    } else {
      filterBy = {};
    }
    orderByObj = {};
    orderByObj[orderBy] = -1;
    db.find(filterBy).sort(orderByObj).exec(next);
  });
}

function setNote(noteId, noteData, next) {
  db.update({ _id: noteId }, noteData, {}, next);
}

module.exports = {'getNotes': getNotes, 'getNote': getNote, 'setNote': setNote, 'createNote': createNote};
