(function() {
    var app = angular.module('myApp');
  
    function getDisplay(settings) {
        return function display(searchBox) {
            var places = searchBox.getPlaces()
            if (places.length == 0) return;
            
            var center = places[0];
            settings.longitude = center.geometry.location.lng();
            settings.latitude = center.geometry.location.lat();
        }
    }
  
    app.controller('configCtrl', ['$http', "$scope", "myConfig",
        function ($http, $scope, $config) {
            var vm = this;
            
            vm.weather = {
                location: $config.weather.location,
                zoom: 15,
                searchbox: {
                    template: "searchbox.tpl.html",
                    events: {}
                }
            };
            vm.weather.searchbox.events.places_changed = getDisplay(vm.weather.location);
            
            vm.travel = {
                from: {
                    location: $config.travelTime.from,
                    zoom: 15,
                    searchbox: {
                        template: "searchbox.tpl.html",
                        events: {}
                    }
                },
                to: {
                    location: $config.travelTime.to,
                    zoom: 15,
                    searchbox: {
                        template: "searchbox.tpl.html",
                        events: {}
                    }
                }
            };
            vm.travel.from.searchbox.events.places_changed = getDisplay(vm.travel.from.location);
            vm.travel.to.searchbox.events.places_changed = getDisplay(vm.travel.to.location);
            vm.mic = $config.mic;
            
            vm.save = function() {
                $config.weather.location = vm.weather.location;
                $config.travelTime.from = vm.travel.from.location;
                $config.travelTime.to = vm.travel.to.location;
                $config.mic.username = vm.mic.username;
                
                $http.post("/api/config", $config).then(function(resp) {
                    app.constant("myConfig", $config);
                });
            };
        }
    ]);
  
}());