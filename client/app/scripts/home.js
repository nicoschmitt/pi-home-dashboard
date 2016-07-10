(function() {
    var app = angular.module('myApp');
    
    app.controller('homeCtrl', ['$window', "$scope", "$interval", "myConfig",
        function ($window, $scope, $interval, $config) {
            var vm = this;
            vm.isWorkingDay = true;
            
            if ($config.env == "development") {
                vm.debug = $(window).width() + "x" + $(window).height();
                $($window).resize(function() {
                    $scope.$apply(function () {
                        vm.debug = $(window).width() + "x" + $(window).height();
                    });
                });
            }
            
            function update() {
                vm.isWorkingDay = moment().startOf('day').isWorkingDay();
            }
            
            var tick = $interval(update, 3*60*60*1000); // update every 3 hours
            $scope.$on("$destroy", () => {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                } 
            });
            
            update();
        }
    ]);
  
}());