(function() {
    var app = angular.module('myApp', [ 'ngRoute', "ngMaterial", 'uiGmapgoogle-maps' ]);
  
    app.config(['myConfig', '$routeProvider', 'uiGmapGoogleMapApiProvider', 
        function ($config, $routeProvider, uiGmapGoogleMapApiProvider) {

            $routeProvider.when("/Home", {
                templateUrl: "/app/views/home.html",
                controller: "homeCtrl",
                controllerAs: "vm"
                
            }).when("/Config", {
                templateUrl: "/app/views/config.html",
                controller: "configCtrl",
                controllerAs: "vm"
                
            }).otherwise({ redirectTo: "/Home" });
            
            uiGmapGoogleMapApiProvider.configure({
                key: $config.googleKey,
                v: '3.23', 
                libraries: 'places'
            });
    }]);
   
    fetchData().then(launchApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        return $http.get("/api/config").then(function(resp){
            app.constant("myConfig", resp.data);
        });
    };

    function launchApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["myApp"]);
        });
    };
  
}());