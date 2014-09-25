'use strict';

angular.module('mean.summaries').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'Summaries', 'Notebooks',
	function($scope, $modalInstance, Summaries, Notebooks) {

		$scope.create = function(isValid) {
			if (isValid) {
				var summary = new Summaries({
					title: this.title,
					content: this.content
				});
				// var notebook = new Notebooks({
				// 	title: this.notebook
				// });


				// notebook.$save(function(response) {

				// });
				summary.$save(function(response) {
					$modalInstance.close(summary);
				});

				this.title = '';
				this.content = '';
				this.notebook = '';
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

				//save notebook if it does not exist
				// var notebook = new Notebooks({
				// 	title: summary.notebook
				// });
				// notebook.$save(function(response) {

				// });

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