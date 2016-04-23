/* global angular */
(function() {
    var app = angular.module('myApp', [ 'ngRoute', "ngMaterial", "chart.js" ]);
  
    app.config(['$routeProvider',
        function ($routeProvider) {

            $routeProvider.when("/Home", {
                templateUrl: "/app/views/home.html",
                controller: "homeCtrl",
                controllerAs: "vm"
                
            }).otherwise({ redirectTo: "/Home" });
    }]);
   
    fetchData().then(launchApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        return $http.get("/api/config").then(function(resp){
            app.constant("env", resp.data.env);
        });
    };

    function launchApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["myApp"]);
        });
    };
  
}());