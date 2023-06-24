$(() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  function createTweetElement(tweet) {
    const englishDate = new Date(tweet.created_at).toLocaleDateString("en-US");
    // prevent cross site    
    let html = `
    <section class="past-tweet">
      <article class="tweet">
        <header>
          <div class="photo">
          <img src="${tweet.user.avatars}">
          <a>${tweet.user.name}</a>
          </div>
          <a class="handle">${tweet.user.handle}</a>
        </header>
        <div class="tweet-body">
          <a class="tweet-content">${tweet.content.text}</a>
        </div>
        <footer>
          <a>${englishDate}</a>
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
    return html;
  };

  function renderTweets (tweets) {
    let tweetsContainer = $('.container');
    for (tweet of tweets) {
      let tweetElement = createTweetElement(tweet); 
      tweetsContainer.prepend(tweetElement); 
    }

  }
  
  const $newTweetForm = $('.new-tweet form'); //grab the form

  $newTweetForm.on('submit', function(event) {
    //event.preventDefault();
    const tweetContents = $('textarea#tweet-text.tweet-content').val();
    const tweetLength = tweetContents.length;
    console.log(tweetContents);
    console.log(tweetLength);
    // // over limit?
    // if (tweetLength > 140) {
    //   return;
    // }

    // // no content?
    // if (!tweetLength) {
    //   return;
    // }
    // // serialize the form data and send it to the server as a query string
    // const data = $newTweetForm.serialize();

    const data = $newTweetForm.serialize();
    console.log($newTweetForm.serialize());

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: data,
      success: () => {
        $('.exceeds-limit').hide();
        $('.no-content').hide();
      }
    });
  });

   renderTweets(data);
});