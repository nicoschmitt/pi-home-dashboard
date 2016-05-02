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
            
            vm.rer = { depart: "", arrivee: "" };
            vm.gares = [];
            
            $http.get("/api/rer/gares").then(function(resp) {
                vm.gares = resp.data.map(g => { 
                    g.search = g.nom.toLowerCase().replace(/\W/g, "");
                    return g; 
                });
                if ($config.rer.depart) {
                    vm.rer.depart = vm.gares.find(g => g.uic == $config.rer.depart);
                    vm.rer.arrivee = vm.gares.find(g => g.uic == $config.rer.arrivee);
                }
            });
            
            vm.searchGare = function(find) {
                var txt = (find || "").toLowerCase().replace(/\W/g, "");
                return vm.gares.filter(g => g.search.indexOf(txt) >= 0);
            }
            
            vm.save = function() {
                $config.weather.location = vm.weather.location;
                $config.travelTime.from = vm.travel.from.location;
                $config.travelTime.to = vm.travel.to.location;
                $config.mic.username = vm.mic.username;
                $config.rer.depart = vm.rer.depart.uic;
                $config.rer.arrivee = vm.rer.arrivee.uic;
                
                $http.post("/api/config", $config).then(function(resp) {
                    app.constant("myConfig", $config);
                });
            };
        }
    ]);
  
}());