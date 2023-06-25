$(() => {
  const createTweetElement = function(tweet) {
    const timeStampUNIX = new Date(tweet.created_at).toLocaleDateString("en-US");
    const timeAgo = timeago.format(timeStampUNIX);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
    let tweetHTML = `
    <section class="past-tweet">
      <article class="tweet">
        <header>
          <div class="photo">
          <img src="${escape(tweet.user.avatars)}">
          <a>${escape(tweet.user.name)}</a>
          </div>
          <a class="handle">${escape(tweet.user.handle)}</a>
        </header>
        <div class="tweet-body">
          <a class="tweet-content">${escape(tweet.content.text)}</a>
        </div>
        <footer>
          <a>${timeAgo}</a>
          <a>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </a>
        </footer>
      </article>
    </section>
    `;
   // let tweetElement = $tweet.append(html)
    $('.container').prepend(tweetHTML); 
  };

  const renderTweets = function(tweets) {
    const tweetsContainer = $('.container');
    // tweetsContainer.empty();


    for (tweet of tweets) {
      createTweetElement(tweet); 
    }

  }
  
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
        } 
      });
    } else {
      window.alert("Sorry, that tweet is too long!");
    }
  });

});