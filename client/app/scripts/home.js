(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ['$window', "$scope", "myConfig",
        function ($window, $scope, $config) {
            var vm = this;
            if ($config.env == "development") {
                vm.debug = $(window).width() + "x" + $(window).height();
                $($window).resize(function() {
                    $scope.$apply(function () {
                        vm.debug = $(window).width() + "x" + $(window).height();
                    });
                });
            }
        }
    ]);
  
}());