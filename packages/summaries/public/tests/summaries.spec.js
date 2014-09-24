'use strict';

(function() {
  // Summaries Controller Spec
  describe('MEAN controllers', function() {
    describe('SummariesController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.summaries');
      });

      // Initialize the controller and a mock scope
      var SummariesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        SummariesController = $controller('SummariesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one summary object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('summaries').respond([{
            title: 'An Summary about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.summaries).toEqualData([{
            title: 'An Summary about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one summary object fetched ' +
        'from XHR using a summaryId URL parameter', function() {
          // fixture URL parament
          $stateParams.summaryId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testSummaryData = function() {
            return {
              title: 'An Summary about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/summaries\/([0-9a-fA-F]{24})$/).respond(testSummaryData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.summary).toEqualData(testSummaryData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postSummaryData = function() {
            return {
              title: 'An Summary about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseSummaryData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Summary about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Summary about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('summaries', postSummaryData()).respond(responseSummaryData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/summaries/' + responseSummaryData()._id);
        });

      it('$scope.update(true) should update a valid summary', inject(function(Summaries) {

        // fixture rideshare
        var putSummaryData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Summary about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock summary object from form
        var summary = new Summaries(putSummaryData());

        // mock summary in scope
        scope.summary = summary;

        // test PUT happens correctly
        $httpBackend.expectPUT(/summaries\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/summaries\/([0-9a-fA-F]{24})$/, putSummaryData()).respond();
        /*
                Error: Expected PUT /summaries\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Summary about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Summary about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/summaries/' + putSummaryData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid summaryId ' +
        'and remove the summary from the scope', inject(function(Summaries) {

          // fixture rideshare
          var summary = new Summaries({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.summaries = [];
          scope.summaries.push(summary);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/summaries\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(summary);
          $httpBackend.flush();

          // test after successful delete URL location summaries list
          //expect($location.path()).toBe('/summaries');
          expect(scope.summaries.length).toBe(0);

        }));
    });
  });
}());
