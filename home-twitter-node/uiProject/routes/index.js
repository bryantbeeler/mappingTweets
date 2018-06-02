var express = require('express');

var Twitter = require('twitter');
var config = require('../config.js');
var axios = require('axios');
const cors = require('cors');
const router = express();
router.use(cors());

var DATA = {};
var T = new Twitter(config);

/* GET home page. */ 
router.get('/askTwitter', function(req, res,) {

  //#homedepot 
  var params = {
    q: '@homedepot',
    count: 50,
    result_type: 'recent',
    lang: 'en'
  }
  
  T.get('search/tweets', params, (err, data, response) => {
    // If there is no error, proceed
    if(err){
      return console.log(err);
    }
  
    console.log(data);
    // Loop through the returned tweets
    const parsedData = data.statuses
         .map(tweet => (
          { 
            id: tweet.id_str,
            location: tweet.user.location,
            created_at: tweet.created_at,
            profile_image_url: tweet.user.profile_image_url,
            screen_name: tweet.user.screen_name,
            tweet_text: tweet.text
          })
        );
        // console.log(parsedData);
        res.json(parsedData);

      })


  //res.render('index', { title: 'Express' });
});



module.exports = router;
