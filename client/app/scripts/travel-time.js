(function() {
    var app = angular.module('myApp');
    
    app.controller('travelCtrl', ["$scope", "$http", "$interval", "$timeout", "myConfig",
        function ($scope, $http, $interval, $timeout, myConfig) {
            var vm = this;
            vm.warning = false;
            vm.routes = [];
            
            var from = myConfig.travelTime.from.latitude + "," + myConfig.travelTime.from.longitude;
            var to = myConfig.travelTime.to.latitude + "," + myConfig.travelTime.to.longitude;
            function update() {
                var qs = "?from=" + from + "&to=" + to;
                $http.get("/api/travel" + qs).then(function(resp) {
                    vm.warning = false;
                    vm.routes = resp.data;
                    vm.routes.map(elt => {
                        elt.nicedist = (elt.dist / 1000).toFixed(2) + "km";
                        var duration = moment.duration(elt.time, "s");
                        elt.nicetime = "";
                        if (duration.hours() > 0) {
                            elt.nicetime = duration.hours() + "h ";
                        }
                        elt.nicetime += duration.minutes() + " min";
                        return elt;
                    });
                }, function(resp) {
                    // error
                    console.log("error loading travel time data");
                    vm.warning = true;
                    $timeout(update, 30*1000); // retry in 30 seconds
                });
            }
            
            var tick = $interval(update, 6*60*1000); // update every 4 minutes
            $scope.$on("$destroy", () => {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                } 
            });
            
            update();
        }
    ]);
  
    app.directive("travel", function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "/app/views/travel-time.html",
            controller: "travelCtrl",
            controllerAs: "vm"
        };
    });
  
}());
