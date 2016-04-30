(function() {
    
    var app = angular.module('myApp');
    
    function getCssClas(icon) {
        return "wi-forecast-io-" + icon;
    }
  
    app.controller('weatherCtrl', ["$scope", "$http", "$interval", "myConfig",
        function ($scope, $http, $interval, myConfig) {
            var vm = this;
            vm.weather = {};
            vm.tempchart = [];
            
            function update() {
                var location = myConfig.weather.location;
                console.log("weather for " + location);
                $http.get("/api/weather/" + location).then(function(resp) {
                    vm.weather = resp.data;
                    vm.weather.currently.class = getCssClas(vm.weather.currently.icon);
                    
                    console.log(vm.weather);
                    
                    vm.tempchart = vm.weather.day.data;
                });
            }
            
            var tick = $interval(update, 10*60*1000); // update every 10 minutes
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
            scope: {},
            templateUrl: "/app/views/weather.html",
            controller: "weatherCtrl",
            controllerAs: "vm"
        };
    });
  
}());
