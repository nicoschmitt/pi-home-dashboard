(function() {
    var app = angular.module('myApp');
    
    app.controller('travelCtrl', ["$scope", "$http", "$interval",
        function ($scope, $http, $interval) {
            var vm = this;
            vm.routes = [];
            
            function update() {
                var qs = "?type=" + $scope.type + "&from=" + $scope.from + "&to=" + $scope.to;
                $http.get("/api/travel" + qs).then(function(resp) {
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
                });
            }
            
            var tick = $interval(update, 6*60*1000); // update every 6 minutes
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
            scope: {
                from: "@",
                to: "@",
                type: "@"
            },
            templateUrl: "/app/views/travel-time.html",
            controller: "travelCtrl",
            controllerAs: "vm"
        };
    });
  
}());
