(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ['$window', 
        function ($window) {
            var vm = this;
            vm.debug = $(window).width() + "x" + $(window).height();
        }
    ]);
  
}());