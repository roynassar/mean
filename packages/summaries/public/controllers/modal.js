'use strict';

angular.module('mean.summaries').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$stateParams', 'Summaries',
  function($scope, $modalInstance, $stateParams, Summaries ) {

	  $scope.create = function(isValid) {
      if (isValid) {
        var summary = new Summaries({
          title: this.title,
          content: this.content
        });
        summary.$save(function(response) {
          $modalInstance.close(summary);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var summary = $scope.summary;
        if (!summary.updated) {
          summary.updated = [];
        }
        summary.updated.push(new Date().getTime());

        summary.$update(function() {
          $modalInstance.close(summary);
        });
      } else {
        $scope.submitted = true;
      }
    };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };



	  $scope.findOne = function() {
			// $scope.summary = summary;
    };

	}
]);