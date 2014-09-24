'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Summary = mongoose.model('Summary'),
  _ = require('lodash');


/**
 * Find summary by id
 */
exports.summary = function(req, res, next, id) {
  Summary.load(id, function(err, summary) {
    if (err) return next(err);
    if (!summary) return next(new Error('Failed to load summary ' + id));
    req.summary = summary;
    next();
  });
};

/**
 * Create an summary
 */
exports.create = function(req, res) {
  var summary = new Summary(req.body);
  summary.user = req.user;

  summary.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the summary'
      });
    }
    res.json(summary);

  });
};

/**
 * Update an summary
 */
exports.update = function(req, res) {
  var summary = req.summary;

  summary = _.extend(summary, req.body);

  summary.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the summary'
      });
    }
    res.json(summary);

  });
};

/**
 * Delete an summary
 */
exports.destroy = function(req, res) {
  var summary = req.summary;

  summary.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the summary'
      });
    }
    res.json(summary);

  });
};

/**
 * Show an summary
 */
exports.show = function(req, res) {
  res.json(req.summary);
};

/**
 * List of summaries
 */
exports.all = function(req, res) {
  Summary.find().sort('-created').populate('user', 'name username').exec(function(err, summaries) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the summaries'
      });
    }
    res.json(summaries);

  });
};
