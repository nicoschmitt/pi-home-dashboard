(function() {
    
    var app = angular.module('myApp');
    
    function getCssClas(icon) {
        return "wi-forecast-io-" + icon;
    }
  
    app.directive("dateTime", ["$interval", function ($interval) {
        
        function link(scope, element) {
            scope.time = moment().format("LT");
            scope.date = moment().format("LL");
            
            var tick = $interval(function() {
                scope.time = moment().format("LT");
                scope.date = moment().format("LL");
            }, 2000);
            
            element.on('$destroy', function() {
                if (angular.isDefined(tick)) {
                    $interval.cancel(tick);
                    tick = undefined;
                }
            });
        }
        
        return {
            restrict: 'E',
            templateUrl: "/app/views/date-time.html",
            link: link
        };
    }]);
  
}());
