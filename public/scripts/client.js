$(() => {
  const createTweetElement = function(tweet) {
    const timeStampUNIX = tweet.created_at;
    const timeAgo = timeago.format(timeStampUNIX);

    // XSS prevention..
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
    let tweetHTML = `
    <section class="past-tweet">
      <article class="tweet">
        <div class="tweet-header">
          <span class="tweet-header badge">
            <img src="${escape(tweet.user.avatars)}">
            <div>${escape(tweet.user.name)}</div>
          </span>
          <a class="tweet-header handle">${escape(tweet.user.handle)}</a>
        </div>
        <div class="tweet-body">
          <a class="tweet-body content" >${escape(tweet.content.text)}</a>
        </div>
        <div class="tweet-footer">
          <div class="tweet-footer time">${timeAgo}</div>
          <div class"tweet-footer icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </article>
    </section>
    `;
    $('#tweets-container').prepend(tweetHTML);
  };

  const renderTweets = function(tweets) {
    const tweetsContainer = $('#tweets-container');
    $('.past-tweet').remove();
    for (tweet of tweets) {
      createTweetElement(tweet);
    }

  };

  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: (tweetDB) => {
        renderTweets(tweetDB);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  };

  loadTweets();

  const $newTweetForm = $('.new-tweet form'); //grab the form as a jquery object;

  $newTweetForm.on('submit', function(event) {
    event.preventDefault();
    let tweetContents = $('textarea#tweet-text.tweet-content').val();
    const tweetLength = tweetContents.length;
    const tweetLengthIsValid = (tweetLength <= 140);
    const tweetNotEmpty = (tweetLength != 0);

    $("#too-long").slideUp(600);
    if (!tweetLengthIsValid) $("#too-long").slideDown(300);

    $("#tweet-empty").slideUp(600);
    if (!tweetNotEmpty) $("#tweet-empty").slideDown(300);

    if (tweetLengthIsValid && tweetNotEmpty) {
      let URLParams = $newTweetForm.serialize();
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: URLParams,
        success: () => {
          $('textarea#tweet-text.tweet-content').val('');
          loadTweets();
        },
        fail: () => {
          $("#post-error").slideDown(300);
          setTimeout(() => {
            $("#post-error").slideUp(600);
          },2000);
        }
      });
    };
  });

});