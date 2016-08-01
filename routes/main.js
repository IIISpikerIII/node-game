var express = require('express');

/* GET home page. */
exports.get =  function(req, res, next) {
  res.render('index', { title: 'Express' });
};
