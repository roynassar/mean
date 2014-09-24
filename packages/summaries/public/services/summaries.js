'use strict';

//Summaries service used for summaries REST endpoint
angular.module('mean.summaries').factory('Summaries', ['$resource',
  function($resource) {
    return $resource('summaries/:summaryId', {
      summaryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
