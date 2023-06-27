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
    $('.container').prepend(tweetHTML);
  };

  const renderTweets = function(tweets) {
    const tweetsContainer = $('.container');
    for (tweet of tweets) {
      createTweetElement(tweet);
    }
  };

  const loadTweets = function() {
    // make a request to /tweets and receive the array of tweets
    // receive the array of tweets as JSON
    // call it right after its definition.
    // our success callback function will simply call up renderTweets,passing it the response from the AJAX
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
    const tweetIsValid = (tweetLength <= 140);

    $("#too-long").slideUp(600);
    if (!tweetIsValid) $("#too-long").slideDown(300);
    
    if (tweetLength <= 140) {
      let URLParams = $newTweetForm.serialize();
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: URLParams,
        success: () => {
          loadTweets();
        },
        fail: () => {
          $("#invalid").slideDown(300);
          setTimeout(() => {
            $("#invalid").slideUp(600);
          },2000);
        }
      });
    };
  });

});