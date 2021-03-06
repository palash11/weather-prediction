$(function() {
  $(".weather_prediction-city_country_label, .prediction-value, .max-temp-graph-label").hide();
  $('.city-country-submit-btn').click(function(event){
    event.preventDefault();
      $.ajax({
      url: 'http://api.wunderground.com/api/4362c51d1d1e3e4c/forecast/q/'+ $('#id_country').val() + '/' + $('#id_city').val() + '.json',
      type: "GET",
      data_type: "jsonp",
      success: function(val){
        var date = [val.forecast.simpleforecast.forecastday[0].date.epoch * 1000,
                    val.forecast.simpleforecast.forecastday[1].date.epoch * 1000,
                    val.forecast.simpleforecast.forecastday[2].date.epoch * 1000,
                    val.forecast.simpleforecast.forecastday[3].date.epoch * 1000
                   ];
        var temp = [val.forecast.simpleforecast.forecastday[0].high.celsius,
                    val.forecast.simpleforecast.forecastday[1].high.celsius,
                    val.forecast.simpleforecast.forecastday[2].high.celsius,
                    val.forecast.simpleforecast.forecastday[3].high.celsius
                  ];
        var temp_val = temp[0];
        var hum_val = val.forecast.simpleforecast.forecastday[0].maxhumidity;
        var precip = val.forecast.simpleforecast.forecastday[0].conditions;
        var wspd = val.forecast.simpleforecast.forecastday[0].maxwind.kph;
        var nested = new Array();
        for(var i = 0; i< temp.length; i++){
          nested.push([date[i], temp[i]]);
        }
        change_val(hum_val, temp_val, precip, wspd)
        temp_plot(nested)
      },
      error: function(val){
        alert(val)
      },
      complete: function() {
        $(".weather_prediction-city_country_label, .prediction-value, .max-temp-graph-label").fadeIn(1000);        
      }
    });
    function change_val(h, t, p, w){
    $('#drop_humidity').html(h+ "%");
    $('#drop_temp').html(t + "&#8451;");
    $('#drop_precipitate').html(p);
    $('#drop_wind-speed').html(w+ " km/hr");
  }
  function temp_plot(d) {
    var data1 = [ { label: "Temperature", data: d, points: { symbol: "circle", fillColor: "#058DC7" }, color: "#058DC7" }]
       $.plot($("#api_chart"), data1, {
          xaxis: {
              axisLabel: "Days",
              mode: "time",
              timeformat: "%m-%d",
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
  $("#api_chart").bind("plothover", function (event, pos, item) {
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
  });
});
