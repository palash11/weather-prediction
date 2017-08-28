$(function() {
  $( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd',
    minDate: 0,
    maxDate: "7d"
  });
  $('select#id_filter_by, select#id_city, select#id_country').select2();  
  $('.jump-to-top').bind("click", function () {
    $('html, body').animate({scrollTop: 0 }, 1200);
    return false;
  });
});
