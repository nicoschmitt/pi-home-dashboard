(function() {
    
    var app = angular.module('myApp');
    
    app.controller('travelCtrl', ["$scope", "$http", "$interval",
        function ($scope, $http, $interval) {
            var vm = this;
            
        }
    ]);
  
    app.directive("travel", function () {
        return {
            restrict: 'E',
            scope: {
                location: "@"  
            },
            templateUrl: "/app/views/travel.html",
            controller: "travelCtrl",
            controllerAs: "vm"
        };
    });
  
}());
