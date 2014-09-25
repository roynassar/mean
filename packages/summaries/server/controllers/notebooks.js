'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Notebook = mongoose.model('Notebook'),
  _ = require('lodash');


/**
 * Find notebook by id
 */
exports.notebook = function(req, res, next, id) {
  Notebook.load(id, function(err, notebook) {
    if (err) return next(err);
    if (!notebook) return next(new Error('Failed to load notebook ' + id));
    req.notebook = notebook;
    next();
  });
};

/**
 * Create an notebook
 */
exports.create = function(req, res) {
  var notebook = new Notebook(req.body);
  notebook.user = req.user;

  notebook.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the notebook'
      });
    }
    res.json(notebook);

  });
};

/**
 * Update an notebook
 */
exports.update = function(req, res) {
  var notebook = req.notebook;

  notebook = _.extend(notebook, req.body);

  notebook.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the notebook'
      });
    }
    res.json(notebook);

  });
};

/**
 * Delete an notebook
 */
exports.destroy = function(req, res) {
  var notebook = req.notebook;

  notebook.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the notebook'
      });
    }
    res.json(notebook);

  });
};

/**
 * Show an notebook
 */
exports.show = function(req, res) {
  res.json(req.notebook);
};

/**
 * List of notebooks
 */
exports.all = function(req, res) {
  Notebook.find().sort('-created').populate('user', 'name username').exec(function(err, notebooks) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the notebooks'
      });
    }
    res.json(notebooks);

  });
};
