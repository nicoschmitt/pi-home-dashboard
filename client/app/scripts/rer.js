(function() {
    var app = angular.module('myApp');
    
    app.controller('rerCtrl', ["$scope", "$http", "$interval",
        function ($scope, $http, $interval) {
            var vm = this;
            vm.trains = [];
            
            console.log("rer " + $scope.gare);
            
            function update() {
                $http.get("/api/rer/trains/" + $scope.gare).then(function(resp) {
                    vm.trains = resp.data.trains;
                });
            }
            
            // var tick = $interval(update, 3*60*1000); // update every 3 minutes
            // $scope.$on("$destroy", () => {
            //     if (angular.isDefined(tick)) {
            //         $interval.cancel(tick);
            //         tick = undefined;
            //     } 
            // });
            
            update();
        }
    ]);
  
    app.directive("rer", function () {
        return {
            restrict: 'E',
            scope: {
                gare: "@"  
            },
            templateUrl: "/app/views/rer.html",
            controller: "rerCtrl",
            controllerAs: "vm"
        };
    });
  
}());
