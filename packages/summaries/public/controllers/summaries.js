'use strict';

angular.module('mean.summaries').controller('SummariesController', ['$scope', '$modal', '$stateParams', '$location', 'Global', 'Summaries',
  function($scope, $modal, $stateParams, $location, Global, Summaries) {
    $scope.global = Global;

    $scope.hasAuthorization = function(summary) {
      if (!summary || !summary.user) return false;
      //special case when creating (summary has no user._id): summary.user === $scope.global.user._id
      return $scope.global.isAdmin || summary.user._id === $scope.global.user._id || summary.user === $scope.global.user._id;
    };

    $scope.openCreate = function () {

      // Please note that $modalInstance represents a modal window (instance) dependency.
      // It is not the same as the $modal service used above.
      var modalInstance = $modal.open({
        templateUrl: 'summaries/views/create.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: 'lg',
      });

      modalInstance.result.then(function (summary) {
        $scope.summaries.unshift(summary);
      });


    };

    $scope.openUpdate = function (summary) {
      $scope.summary = summary
      // Please note that $modalInstance represents a modal window (instance) dependency.
      // It is not the same as the $modal service used above.
      var modalInstance = $modal.open({
        templateUrl: 'summaries/views/edit.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: 'lg',
      });

    };

    $scope.remove = function(summary) {
      if (summary) {
        summary.$remove();

        for (var i in $scope.summaries) {
          if ($scope.summaries[i] === summary) {
            $scope.summaries.splice(i, 1);
          }
        }
      } else {
        $scope.summary.$remove(function(response) {
          $location.path('summaries');
        });
      }
    };

    $scope.find = function() {
      Summaries.query(function(summaries) {
        $scope.summaries = summaries;
      });
    };

  }
]);
