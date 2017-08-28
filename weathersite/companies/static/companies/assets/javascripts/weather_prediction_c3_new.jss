onReady('#weather-prediction-graph', function() {
  $('.submit-btn').click(function(){
    $.ajax({
      url: "http://127.0.0.1:8000/plot/2017-03-15",
      type: "GET",
      data_type: 'json',
      success: function(data){
        alert(data)
        plotGraph(data);
      },
      error: function(data){
        alert("Error")
      }
    });
  });
 //  var args={
 //    'temp':[17.99105282271151, 17.991067978985072, 17.99108313525864, 17.991098291532207,
 // 17.991113447805773, 17.99112860407934, 17.991143760352905, 17.991158916626475]
 //  }
function plotGraph(data){
  var chart = c3.generate({
    bindto: "#temp-graph",
    data: {
      columns: [ "Temperature", data.temp],
      types: {
        data1: 'temperature'
      }
    },
    axis: {
      y: {
        max: 100,
        min: 0,
      }
    }
  });
}
});
function onReady(selector, callback) {
  var intervalID = window.setInterval(function() {
    if (document.querySelector(selector) !== undefined) {
      window.clearInterval(intervalID);
      callback.call(this);
    }
  }, 500);
}
