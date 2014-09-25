'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Summaries = new Module('summaries');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Summaries.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Summaries.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Summaries.menus.add({
    'roles': ['authenticated'],
    'title': 'Summaries',
    'link': 'all summaries'
  });

  //Summaries.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Summaries.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Summaries.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Summaries.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Summaries.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Summaries.aggregateAsset('css', 'Summaries.css');
  // Summaries.angularDependencies(['xeditable']);

  return Summaries;
});