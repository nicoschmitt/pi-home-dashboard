(function() {
    
    var app = angular.module('myApp');
    
    function currentQuarter() {
        var now = moment().month();
        if (now < 3) return "Q1";
        if (now < 6) return "Q2";
        if (now < 6) return "Q3";
        else return "Q4";
    }
    
    app.controller('micCtrl', ["$scope", "$http", "$interval",
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
            templateUrl: "/app/views/mic.html",
            controller: "micCtrl",
            controllerAs: "vm"
        };
    });
  
}());
