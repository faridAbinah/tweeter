/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$().ready(() => {

  const createTweetElement = function(tweetObject) {

    const escape = function (str) {

      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML; 
    }

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
          ${escape(tweetObject.content.text)}
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
    // console.log(arrayOfTweets);

    $('#tweet-section').empty();

    for(let userObject of arrayOfTweets) {
      const tweet = createTweetElement(userObject);
      $('#tweet-section').prepend(tweet);
     
    }

    
  }

  const loadTweets = function() {
    // Get request using ajax and jquery
    $.ajax({
      url:"/tweets/",
      methods:"GET",
      dataType:"json",
      success:(data) => {
        // console.log("data: ",data);

        renderTweets(data);
      },
      error: (err) => {
        console.log(`error ${err}`);
      }

    })

    // $.get("/tweets/",renderTweets);

   
  }

  
  
  loadTweets();
    //hide error messages 
    $('#0-char-error').hide();
    //hide error messages 
    $('#max-char-error').hide();
   
  $('#tweet-form').submit(function(event) {
   
    event.preventDefault();
    const serializedData = $(this).serialize();

    console.log("form submitted", serializedData);

    console.log("text area value",$('#tweet-text').val().length);

    
    //Form Validation
    if($('#tweet-text').val().length === 0 ) {
      $('#0-char-error').show();
     
    } else if($('#tweet-text').val().length > 140){

      $('#max-char-error').show();

    } else {

       //hide error messages 
    $('#0-char-error').hide();
    //hide error messages 
    $('#max-char-error').hide();

      //Post request sending serialized data to the server
      $.post("/tweets/",serializedData,function(success) {
  
      console.log(serializedData,"Post request",success);
        
      loadTweets();

      });}

    
  });

  

 
});


