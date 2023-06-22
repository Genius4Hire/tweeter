$(document).ready(function() {



  $("#new-tweet-textarea").keyup(function() {
    const maxLength = 140;
    const currentText = $(this).val();
    const currentLength = $(this).val().length;
    const charsRemaining = maxLength - currentLength;

    if (charsRemaining < 0) {
      $("#new-tweet-counter").css({'color': '#ff0000'});
    } else {
      $("#new-tweet-counter").css({'color': '#555149'});

    };

    $("#new-tweet-counter").text(charsRemaining);

  });
  

  // put a reference to the "div-two" element in a variable
  // const textArea = document.getElementById("new-tweet-textarea");
  // const tweetLength = document.getElementById("new-tweet-counter")
  
  // // when div2 is clicked, run the function
  // textArea.addEventListener('keydown', );
  // //tweetLength.addEventListener('')

});