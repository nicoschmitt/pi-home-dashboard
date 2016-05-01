(function() {
    var app = angular.module('myApp');
  
    app.controller('configCtrl', ['$window', "$scope", "myConfig",
        function ($window, $scope, $config) {
            var vm = this;
            
            vm.config = $config;
        }
    ]);
  
}());