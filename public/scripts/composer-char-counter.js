

$(document).ready(function() {
  
  
  $('#tweet-text').on('keyup', function() {
    
    // console.log($(this).val().length);

    $(this).parent().find('#submit-counter').find('output').text( 140 - $(this).val().length);
    // .container div output
    console.log($(this).parent().find("#submit-counter").find("output"));

    
    if($(this).val().length >= 140) {
      console.log("Success");
     let output = $(this).parent().find("#submit-counter").find("output");
      console.log(output);
     output.addClass('red-text');

  }

  if($(this).val().length <= 140) {
    let output = $(this).parent().find("#submit-counter").find("output");

    output.removeClass("red-text");
  }
  });
});

//1 level up from textarea
//find first div
//get child output element

//if condition comparing length of textarea > 140
//if true change counter to color red, show