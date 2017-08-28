var map, pointarray, heatmap;
		var csv = [];
		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		function handleFileSelect(evt) {
			var file = evt.target.files[0];
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: function(results) {
					csv = [];
					if(results.meta.fields.indexOf("weight") == -1) {
						for(idx in results["data"]) {
							var row = results["data"][idx];
							csv.push(new google.maps.LatLng(row["lat"], row["lon"]))
						}
					} else {
						var max = results["data"][0]["weight"];

						for(idx in results["data"]) {
							var row = results["data"][idx];

							max = Math.max(max, row["weight"]);

							csv.push({
								location: new google.maps.LatLng(row["lat"], row["lon"]),
								weight: row["weight"]
							});
						}
						$("#max-label").html("max: "+numberWithCommas(max));
						$("#max-slider").slider("option","max",max);
						$("#max-slider").slider("option","value",max);
					}
					loadHeatmap(csv);
				}
			});
		}
		function initialize() {
			 map = new google.maps.Map(document.getElementById('map-canvas'), {
			    zoom: 7,
			    center: {lat: 19.0760, lng: 72.8777}
			  });
			  var coord = {lat : 19.0760, lng : 72.8777};
			  $.ajax({
			      url: "https://api.darksky.net/forecast/536e1f45fe7b65616983f79f874d47e5/"+ 19.0760 + "," + 72.8777,
						xhrFields: {
					      withCredentials: true
					   },
			      type: "GET",
			      dataType: 'jsonp',
			      success: function(val) {
			        var temp_val = (val.daily.data[0].temperatureMin - 32) * 5/9;
			        var hum_val = val.daily.data[0].humidity * 100;
			        var press_val = val.daily.data[0].pressure;
			        var wspd = val.daily.data[0].windSpeed;
			        var arr = [(val.daily.data[0].temperatureMin - 32) * 5/9, (val.daily.data[1].temperatureMin - 32) * 5/9, (val.daily.data[2].temperatureMin - 32) * 5/9, (val.daily.data[3].temperatureMin - 32) * 5/9, (val.daily.data[4].temperatureMin - 32) * 5/9, (val.daily.data[5].temperatureMin - 32) * 5/9, (val.daily.data[6].temperatureMin - 32) * 5/9];
			        var d = new Array();
			        for(var i = 0;i<arr.length;i++){
			          var date = val.daily.data[i].time * 1000;
			          d.push([date, arr[i]]);
			        }
			        change_val(hum_val, temp_val, press_val, wspd)
			        temp(d)
			      },
						error: function (xhr, ajaxOptions, thrownError) {
				      alert(xhr.status);
				      alert(thrownError);
				    }
		    	});
			  placeMarker(coord, map);
			  
			  // map = new google.maps.Map(document.getElementById('map-canvas'),
				 //  mapOptions);
			  google.maps.event.addListener(map, 'click', function(event) {
		      var coordInfoWindow;
		      var pos;
		      var latitude = event.latLng.lat();
		      var longitude = event.latLng.lng();
		      var position = new google.maps.LatLng(latitude, longitude);
			  var key = '536e1f45fe7b65616983f79f874d47e5';
		      $.ajax({
			      url: "https://api.darksky.net/forecast/" + key + "/"+ latitude + "," + longitude + "/",
						xhrFields: {
					      withCredentials: true
					   },
			      type: "GET",
			      dataType: 'jsonp',
			      success: function(val) {
			        var temp_val = (val.daily.data[0].temperatureMin - 32) * 5/9;
			        var hum_val = val.daily.data[0].humidity * 100;
			        var press_val = val.daily.data[0].pressure;
			        var wspd = val.daily.data[0].windSpeed;
			        var arr = [(val.daily.data[0].temperatureMin - 32) * 5/9, (val.daily.data[1].temperatureMin - 32) * 5/9, (val.daily.data[2].temperatureMin - 32) * 5/9, (val.daily.data[3].temperatureMin - 32) * 5/9, (val.daily.data[4].temperatureMin - 32) * 5/9, (val.daily.data[5].temperatureMin - 32) * 5/9, (val.daily.data[6].temperatureMin - 32) * 5/9];
			        var d = new Array();
			        for(var i = 0;i<arr.length;i++){
			          var date = val.daily.data[i].time * 1000;
			          d.push([date, arr[i]]);
			        }
			        change_val(hum_val, temp_val, press_val, wspd)
			        temp(d)
			      },
						error: function (xhr, ajaxOptions, thrownError) {
				      alert(xhr.status);
				      alert(thrownError);
				    }
		    	});
		    	placeMarker(event.latLng, map);
	  		});
		}

		function placeMarker(latLng, map) {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
			map.panTo(latLng);
		}

		function loadHeatmap(csv) {
			var pointArray = new google.maps.MVCArray(csv);

			if(heatmap) heatmap.setMap(null);

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: pointArray,
				radius: $("#radius-slider").slider("value"),
			});

			heatmap.setMap(map);
		}
		function change_val(h, t, p, w) {
      $('#humidity-value').html(h+ "%");
      $('#temp-value').html(t.toFixed(2)+ "&#8451;");
      $('#wind-pressure').html(p+ " mbar");
      $('#wind-speed').html(w+ " km/hr");
		}
			    function temp(d) {
			      var data1 = [ { label: "Temperature", data: d, points: { symbol: "circle", fillColor: "#058DC7" }, color: "#058DC7" }]
			         $.plot($("#chart-div"), data1, {
			            xaxis: {
			                axisLabel: "Days",
			                mode: "time",
			                timeformat: "%Y-%m-%d",
			                  tickSize: [1, "day"],
			                axisLabelUseCanvas: true,
			                axisLabelFontSizePixels: 12,
			                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
			                axisLabelPadding: 5
			            },
			            yaxis: {
			                axisLabel: "Temperature (C)",
			                axisLabelUseCanvas: true,
			                axisLabelFontSizePixels: 12,
			                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
			                axisLabelPadding: 5
			            },
			            series: {
			                points: {
			                  radius: 3,
			                  show: true,
			                  fill: true
			                },
			            },
			            legend: {
			              labelBoxBorderColor: "black",
			              position: "left"
			            },
			            grid: { hoverable: true, clickable: true }
			        });
			    }
		    	function showTooltip(x, y, contents) {
		            $('<div id="tooltip">' + contents + '</div>').css( {
		                position: 'absolute',
		                display: 'none',
		                top: y + 5,
		                left: x + 5,
		                border: '1px solid #fdd',
		                padding: '2px',
		                'background-color': '#fee',
		                opacity: 0.80
		            }).appendTo("body").fadeIn(200);
		        }
	    		var previousPoint = null;
			    $("#chart-div").bind("plothover", function (event, pos, item) {
			        if (item) {
			            if (previousPoint != item.datapoint) {
			                previousPoint = item.datapoint;

			                $("#tooltip").remove();
			                var x = item.datapoint[0].toFixed(),
			                    y = item.datapoint[1].toFixed(9);

			                showTooltip(item.pageX, item.pageY,
			                            item.series.label + " (C) = " + y);
			            }
			        }
			        else {
			            $("#tooltip").remove();
			            clicksYet = false;
			            previousPoint = null;
			        }
			    });
    function changeGradient() {
            var gradient = [
              'rgba(0, 255, 255, 0)',
              'rgba(0, 255, 255, 1)',
              'rgba(0, 191, 255, 1)',
              'rgba(0, 127, 255, 1)',
              'rgba(0, 63, 255, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 223, 1)',
              'rgba(0, 0, 191, 1)',
              'rgba(0, 0, 159, 1)',
              'rgba(0, 0, 127, 1)',
              'rgba(63, 0, 91, 1)',
              'rgba(127, 0, 63, 1)',
              'rgba(191, 0, 31, 1)',
              'rgba(255, 0, 0, 1)'
            ]
            heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
          }

		$(document).ready(function(){
			$("#csv-file").change(handleFileSelect);

			google.maps.event.addDomListener(window, 'load', initialize);

			$(function() {
				$( "#draggable" ).draggable();
			});

			$(function() {
				$( "#radius-slider" ).slider({
					orientation: "horizontal",
					range: "min",
					min: 1,
					max: 50,
					value: 20,
					slide: function(event, ui) {
						$("#radius-label").html("radius: " + ui.value);
						if(heatmap == null) return;
						heatmap.set('radius', ui.value);
					}
				});
			});
		});
