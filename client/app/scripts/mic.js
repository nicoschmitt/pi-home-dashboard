(function() {
    
    var app = angular.module('myApp');
    
    app.controller('micCtrl', ["$scope", "$http", 
        function ($scope, $http) {
            var vm = this;
            $http.get("/api/mic/" + $scope.username).then(function(resp) {
                vm.quarter = resp.data.quarter;
                vm.PG1 = resp.data.PG1;
                vm.PG2 = resp.data.PG2;
            });
        }
    ]);
  
    app.directive("mic", function () {
        return {
            restrict: 'E',
            scope: {
                username: "@"  
            },
            templateUrl: "/app/views/mic.html",
            controller: "micCtrl",
            controllerAs: "vm"
        };
    });
  
}());
