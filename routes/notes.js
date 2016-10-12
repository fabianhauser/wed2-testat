var express = require('express');
var router = express.Router();

/* notes listing */
router.post('/', function(req, res, next) {
  console.log("TODO: Set user view configuration  as cookie " +
    "& pass to next");
  next();
});

router.get('/', function(req, res, next) {
  res.render('notes', { title: 'Express' });
});


/* new note */
router.get('/new', function(req, res, next) {
  res.render('notes-new', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
  console.log("TODO: Data Storage");
  res.redirect(302, '/');
});

/* edit note */
router.get('/:id', function(req, res, next) {
  res.render('notes-edit', { title: 'Express' });
});

router.post('/:id', function(req, res, next) {
  console.log("TODO: Data Storage");
  res.redirect(302, '/');
});

module.exports = router;
