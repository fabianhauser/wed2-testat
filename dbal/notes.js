var Dbal = function Dbal(db) {
	this.db = db;
};

Dbal.prototype.getNotes = function(orderBy, filterBy, next) {
  this.db.count({}, function (err, count) {
    if(err) return next(err);
    if(count === 0) return next(null, {});

    this.db.find(filterBy).sort(orderBy).exec(next);
  }.bind(this));
};

Dbal.prototype.getNote = function(noteId, next) {
  noteId = parseInt(noteId); // enforce numeric ID

  this.db.count({ _id: noteId }, function(err, count) {
    if(err) return next(err);
    if(count === 0) return next(null, {});

    this.db.find({_id: noteId}).exec(next);
  }.bind(this));
};

Dbal.prototype.updateNote = function(noteId, noteData, next) {
  // TODO: Validate noteId and noteData
  this.db.update({ _id: nodeId }, noteData, {}, next);
};

Dbal.prototype.createNote = function(noteData, next) {
  // TODO: Validate noteData
  this.db.insert(noteData, next);
};

module.exports = Dbal;
