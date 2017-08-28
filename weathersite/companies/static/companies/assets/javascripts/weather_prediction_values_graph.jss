$(function() {
  $(".prediction-value, .prediction-values-label, .weather-prediction-graph-label, #temp-graph").hide();
  var input_date=$("#id_date").val();
  if(input_date!="") {
    $.getJSON("http://104.239.142.148:9000/plot/" + input_date, function(json) {
      var res = new Array();
      var plotarea = $("#temp-graph");
      var arr = $.map(json.temp, function(el) { return el; })
      for(var i = 0;i<=arr.length;i++) {
        var date1 = $('#id_date').datepicker('getDate');
        var date = new Date( Date.parse( date1 ) );
        res.push([date.setDate( date.getDate() + i ),arr[i]]);
      }
      var data1 = [ { label: "Temperature", data: res, points: { symbol: "circle", fillColor: "#058DC7" }, color: "#058DC7" }];
      $.plot($("#temp-graph"), data1, {
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
      $("#temp-graph").bind("plothover", function (event, pos, item) {
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
    }).done(function() {
      $(".prediction-value, .prediction-values-label, .weather-prediction-graph-label, #temp-graph").fadeIn(1000);
    });
  }
  $(".city-country-submit-btn").click(function(event) {
    event.preventDefault();
    $("#api_chart").css("height", "310px");
  });
});