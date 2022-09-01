var priceCounter;

function getPrice(){
  clearTimeout(priceCounter);

  priceCounter = setTimeout(function(){
    var dims = $('#rangeslider1_input').val().replace(/[^0-9]/g, '');
    var objects = $('#rangeslider2_input').val().replace(/[^0-9]/g, '');
    var queries =  $('#rangeslider3_input').val().replace(/[^0-9]/g, '');
    var sla = $('#sla-select').val();
    var ha = document.getElementById('ha-select').checked;

    if(ha == true){
      ha = '&highAvailability=true';
    } else {
      ha = '';
    }

    var finalUrl = 'https://us-central1-semi-production.cloudfunctions.net/pricing-calculator?embeddingSize=' + dims + '&amountOfDataObjs=' + objects + '&queriesPerMonth=' + queries + '&slaTier=' + sla + ha;

    $.getJSON(finalUrl, function( data ) {
      if(data['message'] == 'Contact sales'){
        $('#contact-sales').show();
        $('.total-price').hide();
      } else {
        $('#contact-sales').hide();
        $('.total-price').show();
        var price = new Intl.NumberFormat().format((data['priceInt'] / 100).toFixed(0));
        $('#total-price-val').text(price);
      }
    });
  }, 250)
}

function setValue(i, c){
  
  // set value
  $(c).val(new Intl.NumberFormat().format($(i).val()));

  // set slider
  if(c == '#rangeslider2_input' || c == '#rangeslider3_input'){
    var mainDiv = c.replace('_input', '');
    if($(i).val() < 10000000){
      $(mainDiv).attr('step', '100000');
      $(mainDiv).rangeslider('update', true);
    } else if($(i).val() < 250000000){
      $(mainDiv).attr('step', '500000');
      $(mainDiv).rangeslider('update', true);
    } else {
      $(mainDiv).attr('step', '50000000');
      $(mainDiv).rangeslider('update', true);
    }
  }

  // get the price
  getPrice();

}

function setSlider(i){
  // set sliders
  $('#rangeslider' + i).rangeslider({polyfill: false });
  $('#rangeslider' + i).on('change input', function () {
    setValue($(this), '#rangeslider' + i + '_input');
  });
  // on focus on input
  $('.rangeslider_input').focus(function() {
    var valNoNum = $(this).val().replace(/[^0-9]/g, '');
    $(this).val(valNoNum);
  });
  // leave focus
  $('.rangeslider_input').focusout(function() {
    var formattedVal = $(this).val();
    if(isNaN(formattedVal) === false){
      // set the value
      $(this).val(new Intl.NumberFormat().format(formattedVal));
      // get the price
      getPrice();
      // set the sliders to reflect the update
      var sliderId = $(this).attr('id').replace('_input', '');
      $('#' + sliderId).val(formattedVal).change();
      // console.log('#' + sliderId, formattedVal);
    }
  });
  // on change of input
  $('.rangeslider_input').keydown(function(event) {
    // Allow only backspace and delete
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9) {
        // this is okay
    } else {
        // Ensure that it is a number and stop the keypress
        if (event.keyCode < 48 || event.keyCode > 57 ) {
            event.preventDefault(); 
        }   
    }
    // set div
    var mainDiv = '#' + $(this).attr('id').replace('_input', '');
    $(mainDiv).attr('value', $(this).val());
    $(mainDiv).rangeslider('update', true);
  });
}

// on change of input
$('#ha-select').change(function(){
  getPrice();
});

// set sliders
setSlider('1')
setSlider('2')
setSlider('3')

// set popper overlay
$(function () {
  $('[data-toggle="popover"]').popover()
})