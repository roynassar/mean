'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var NotebookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: 'unclassified'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
NotebookSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
NotebookSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Notebook', NotebookSchema);
