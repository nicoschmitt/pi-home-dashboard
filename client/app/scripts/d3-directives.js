(function() {
    
    var app = angular.module('myApp');
    
    app.directive("d3Line", [function() {
        
        function link(scope, element) {
            scope.$watch('data', function(data) {
                if (!data || data.length == 0) return;
                
                var width = 400, height = 200;
                var margin = { top: 10, right: 15, bottom: 20, left: 40 };
                width = width - margin.left - margin.right,
                height = height - margin.top - margin.bottom;
                
                var xValues = d3.extent(data, function(d,i) { return new Date(d.time); });
                var yValues = d3.extent(data, function(d,i) { return d.temp });
                                
                var x = d3.time.scale().domain(xValues).range([0, width]);
                var y = d3.scale.linear().domain(yValues).range([height, 0]).nice();
                
                var xAxis = d3.svg.axis().scale(x).orient("bottom")
                        .ticks(d3.time.hours, 2)
                        .tickFormat(function(d) { return moment(d).format("HH[h]"); });
                        
                var yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);
                
                var line = d3.svg.line()
                            .x(function(d) { return x(new Date(d.time)) })
                            .y(function(d) { return y(d.temp) });
                
                d3.select(element[0]).selectAll("*").remove();
                var chart = d3.select(element[0]).append("div").attr("class", "d3-chart-container");
                var svg = chart.append("svg")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
      
                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);
            });

        }
        
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            link: link
        };
    }]);
    
    app.directive("d3Gauge", [function() {
        var numSections = 3;
        var sectionPerc = 1 / numSections / 2;
        var padRad = 0.05;
        var barWidth = 40;
        var chartInset = 10;
        
        var percToDeg = (perc) => { return perc * 360; };
        var degToRad = (deg) => { return deg * Math.PI / 180; };
        var percToRad = (perc) => { return degToRad(percToDeg(perc)); };
        
        function drawNeedle(svg, value) {
            var needle = { len: 75, rad: 12 };
            var mkCmd = () => {
                var thetaRad = percToRad(value / 2);

                var topX = - needle.len * Math.cos(thetaRad)
                var topY = - needle.len * Math.sin(thetaRad)

                var leftX = - needle.rad * Math.cos(thetaRad - Math.PI / 2)
                var leftY = - needle.rad * Math.sin(thetaRad - Math.PI / 2)

                var rightX = - needle.rad * Math.cos(thetaRad + Math.PI / 2)
                var rightY = - needle.rad * Math.sin(thetaRad + Math.PI / 2)

                return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
            };
            
            svg.append('circle')
                .attr('class', 'needle-center')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', needle.rad);
                
            svg.append('path')
                .attr('class', 'needle')
                .attr('d', mkCmd());
        }

        function link(scope, element) {
            scope.$watch('data', function(data) {
                if (!data) return;
                
                var width = 200, height = 200;
                var margin = { top: 10, right: 10, bottom: 10, left: 10 };
                width = width - margin.left - margin.right,
                height = height - margin.top - margin.bottom;
                
                var radius = Math.min(width, height) / 2;
                
                d3.select(element[0]).selectAll("*").remove();
                var chart = d3.select(element[0]).append("div").attr("class", "d3-chart-container");
                var svg = chart.append("svg")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height/2 + margin.top + margin.bottom)
                                .append("g")
                                    .attr('transform', "translate(" + (radius + margin.left/2) + ", " + radius + ")");

                var totalPercent = 0.75;
                for (var i = 1; i <= numSections; i++) {
                    var arcStartRad = percToRad(totalPercent);
                    var arcEndRad = arcStartRad + percToRad(sectionPerc);
                    totalPercent += sectionPerc;
                    var startPadRad = i == 1 ? 0 : padRad / 2;
                    var endPadRad = i == numSections ? 0 : padRad / 2;
                    var arc = d3.svg.arc()
                                .outerRadius(radius - chartInset)
                                .innerRadius(radius - chartInset - barWidth)
                                .startAngle(arcStartRad + startPadRad)
                                .endAngle(arcEndRad - endPadRad);
                    svg.append('path').attr('class', 'arc chart-color' + i).attr('d', arc);
                }

                drawNeedle(svg, data/150); // gauge from 0 to 150%
      
            });

        }
        
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            link: link
        };
    }]);

}());
