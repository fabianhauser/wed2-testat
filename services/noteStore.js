var Datastore = require('nedb');
var db = new Datastore({
  filename: '../data/notes.db',
  autoload: true,
  timestampData: true // autoadd createdAt & updatedAt timestamp fields
});

function publicGetAll(orderBy, filterBy, next) {
  this.db.count({}, function (err, count) {
    if(err) return next(err);
    if(count === 0) return next(null, {});

    this.db.find(filterBy).sort(orderBy).exec(next);
  }.bind(this));
}

function getNote(noteId, next) {
  noteId = parseInt(noteId); // enforce numeric ID

  this.db.count({ _id: noteId }, function(err, count) {
    if(err) return next(err);
    if(count === 0) return next(null, {});

    this.db.find({_id: noteId}).exec(next);
  }.bind(this));
}

function updateNote(noteId, noteData, next) {
  // TODO: Validate noteId and noteData
  this.db.update({ _id: nodeId }, noteData, {}, next);
}

function createNote(noteData, next) {
  // TODO: Validate noteData
  this.db.insert(noteData, next);
}

module.exports = {all: publicGetAll, };