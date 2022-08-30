$('#rangeslider1').rangeslider({polyfill: false });
$('#rangeslider1').on('change input', function () {
  $('#rangeslider1_output').val(String($(this).val().replace(/[^0-9.]/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M');
});

$('#rangeslider2').rangeslider({polyfill: false });
$('#rangeslider2').on('change input', function () {
  $('#rangeslider2_output').val(String($(this).val().replace(/[^0-9.]/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M');
});

$('#rangeslider3').rangeslider({polyfill: false });
$('#rangeslider3').on('change input', function () {
  $('#rangeslider3_output').val(String($(this).val().replace(/[^0-9.]/g, '')).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M');
});