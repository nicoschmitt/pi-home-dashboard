(function() {
    
    var app = angular.module('myApp');
    
    function getCssClas(icon) {
        return "wi-forecast-io-" + icon;
    }
  
    app.controller('weatherCtrl', ["$scope", "$http", "$interval",
        function ($scope, $http, $interval) {
            var vm = this;
            vm.weather = {};
            
            function update() {
                console.log("update weather");
                $http.get("/api/weather/" + $scope.location).then(function(resp) {
                    vm.weather = resp.data;
                    vm.weather.currently.class = getCssClas(vm.weather.currently.icon);
                    vm.weather.day.class = getCssClas(vm.weather.day.icon);
                    vm.weather.week.class = getCssClas(vm.weather.week.icon);
                });
            }
            
            var tick = $interval(update, 5*60*1000); // update every 5 minutes
            $scope.$on("$destroy", () => {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                } 
            });
            
            update();
        }
    ]);
  
    app.directive("weather", function () {
        return {
            restrict: 'E',
            scope: {
                location: "@"  
            },
            templateUrl: "/app/views/weather.html",
            controller: "weatherCtrl",
            controllerAs: "vm"
        };
    });
  
}());