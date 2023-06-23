$(document).ready(function() {


  $(".article-div").hover(function() {
      $(this).css("box-shadow", "5px 5px 15px 5px rgba(0,0,0,0.45)")
    }, 
    function() {
      $(this).css("box-shadow", "5px 5px 15px 5px rgba(0,0,0,0)")
    }
  );


  $(".flag-icon").hover(function() {
    $(this).css("color", "#cb9826")
  }, 
  function() {
    $(this).css("color", "#49569c")
  });

  $(".retweet-icon").hover(function() {
    $(this).css("color", "#cb9826")
  }, 
  function() {
    $(this).css("color", "#49569c")
  });

  $(".like-icon").hover(function() {
    $(this).css("color", "#cb9826")
  }, 
  function() {
    $(this).css("color", "#49569c")
  });


  $("#new-tweet-textarea").keyup(function() {
    const maxLength = 140;
    const currentText = $(this).val();
    const currentLength = $(this).val().length;
    const charsRemaining = maxLength - currentLength;
    $("#new-tweet-counter").text(charsRemaining)
    if (charsRemaining < 0) {
      $("#new-tweet-counter").css({'color': '#ff0000'});
    } else {
      $("#new-tweet-counter").css({'color': '#555149'});
    };


  });


});