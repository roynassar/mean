'use strict';

//Setting up route
angular.module('mean.summaries').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all summaries', {
        url: '/summaries',
        templateUrl: 'summaries/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create summary', {
        url: '/summaries/create',
        templateUrl: 'summaries/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit summary', {
        url: '/summaries/:summaryId/edit',
        templateUrl: 'summaries/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('summary by id', {
        url: '/summaries/:summaryId',
        templateUrl: 'summaries/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
