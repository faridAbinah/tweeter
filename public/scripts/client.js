/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObject) {

  const $tweet = $(`
  <div id="tweet-box" class="tweet-container">
   <article class="tweet">
  
   <header>
          <div class="flex">
          <img class="avatar" src="${tweetObject.user.avatars}">
          <p>
            ${tweetObject.user.name}
          <p>
        </div>
        <div>
          <p>${tweetObject.user.handle}<p>
        </div>
        </header>
        ${tweetObject.content.text}
        <hr>
        
        <footer>
         ${timeago.format(tweetObject.created_at)}
          <div id="icons">
          <a href=""><i class="fas fa-flag icons"></i></a>
          <a href=""><i class="fas fa-retweet icons"></i></a>
          <a href=""><i class="fas fa-heart icons"></i></a>
          </div>
        </footer>
   </article>
   </div>
  `
  );
  

  return $tweet;
};

const renderTweets = function(arrayOfTweets) {

  for(let userObject of arrayOfTweets) {
    const tweet = createTweetElement(userObject);
    $('#tweet-section').append(tweet);
   
  }

}

const tweetData = 
  [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1633388593122
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1633474993122
    }
  ];
 

//const $tweet = createTweetElement(tweetData);


$().ready(() => {

  // $('#tweet-box')
  // .after($tweet);
  renderTweets(tweetData);

  $('#tweet-form').submit(function(event) {
   
    event.preventDefault();
    const serializedData = $(this).serialize();

    console.log("form submitted", serializedData);

    $.post("/tweets/",serializedData,function(sucess) {

    console.log(serializedData,"Post request");
    });
  });


});


