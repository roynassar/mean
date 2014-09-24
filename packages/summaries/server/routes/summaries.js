'use strict';

var summaries = require('../controllers/summaries');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.summary.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Summaries, app, auth) {

  app.route('/summaries')
    .get(summaries.all)
    .post(auth.requiresLogin, summaries.create);
  app.route('/summaries/:summaryId')
    .get(summaries.show)
    .put(auth.requiresLogin, hasAuthorization, summaries.update)
    .delete(auth.requiresLogin, hasAuthorization, summaries.destroy);

  // Finish with setting up the summaryId param
  app.param('summaryId', summaries.summary);
};
