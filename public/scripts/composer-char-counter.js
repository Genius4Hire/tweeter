$(document).ready(function() {




  $("form .tweet-content").on("input", function(event) {
    let $input = $(this);
    const maxLength = 140;
    const currentLength = $input.val().length;
    const charsRemaining = maxLength - currentLength;
    const $counter = $input.closest("form").find(".counter");
    $counter.text(charsRemaining);
    $counter.toggleClass('alert-color', (charsRemaining < 0));
  });


});