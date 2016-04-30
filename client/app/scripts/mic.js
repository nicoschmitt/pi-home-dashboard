(function() {
    
    var app = angular.module('myApp');
    
    app.controller('micCtrl', ["$scope", "$http", "$interval", "myConfig",
        function ($scope, $http, $interval, myConfig) {
            var vm = this;
            
            function update() {
                var username = myConfig.mic.username;
                $http.get("/api/mic/" + username).then(function(resp) {
                    vm.quarter = resp.data.quarter;
                    vm.PG1 = resp.data.PG1;
                    vm.PG2 = resp.data.PG2;
                });
            }
            
            var tick = $interval(update, 5*60*60*1000); // update every 5 hours
            $scope.$on("$destroy", () => {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                } 
            });
            
            update();
        }
    ]);
  
    app.directive("mic", function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "/app/views/mic.html",
            controller: "micCtrl",
            controllerAs: "vm"
        };
    });
  
}());
