'use strict';

angular.module('ngCatApp')
  .controller('MainCtrl', function ($scope, $http, socket, gPlusSerivce) {

    $scope.mainContent = 'This is an editable div';

    $scope.items = [{A:'A', B:'a'}, {A: 'B', B:'b'}, {A:'C', B:'c'}, {A:'D', B:'d'}];
    for (var i=0; i<100; i++) {
      $scope.items.push({A : i, B: '_' + i});
    }
    $scope.headers = ['A', 'B'];

    $scope.paginator = {
      totalItems : $scope.items.length,
      itemsPerPage : 20
    }

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
