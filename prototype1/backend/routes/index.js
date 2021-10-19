/** @format */

var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = (app) => {
  app.get('/', function (req, res, next) {
    res.render('index', {
      title: 'FOOD ONTOLOGY API',
      name: 'Regis Atemengue',
    });
  });
};
