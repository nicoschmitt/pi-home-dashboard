(function() {
    var app = angular.module('myApp');
    
    app.controller('rerCtrl', ["$scope", "$http", "$interval", "myConfig",
        function ($scope, $http, $interval, $config) {
            var vm = this;
            vm.trains = [];
            
            function update() {
                var url = "/api/rer/trains/" + $config.rer.depart + "/" + $config.rer.arrivee;
                $http.get(url).then(function(resp) {
                    vm.trains = resp.data.map(t => { 
                        t.date = moment(t.date);
                        t.nicedate = t.date.fromNow();
                        return t; 
                    });
                    console.log(vm.trains);
                });
            }
            
            var tick = $interval(update, 1*60*1000); // update every 1 minutes
            $scope.$on("$destroy", () => {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                } 
            });
            
            update();
        }
    ]);
  
    app.directive("rer", function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "/app/views/rer.html",
            controller: "rerCtrl",
            controllerAs: "vm"
        };
    });
  
}());
