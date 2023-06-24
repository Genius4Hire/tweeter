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

  $("#new-tweet-textarea").on("input", function(event) {
    let $input = $(this);
    const maxLength = 140;
    const currentLength = $input.val().length;
    const charsRemaining = maxLength - currentLength;
    const $counter = $input.closest("form").find(".counter");
    $counter.text(charsRemaining);
    $counter.toggleClass('alert-color', (charsRemaining < 0));
  });


});