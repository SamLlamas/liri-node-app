var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var tweets = function() {
    client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=SammyVonGinger&count=20",function(error, tweets, response) {
        if(error) throw error;
        for (i = 0; i < tweets.length; i++){
            console.log("Tweet " + parseInt(i+1) +" Created at " + tweets[i].created_at)
            console.log(tweets[i].text + "\n")
        }
      });
};

var WhatSong = function(song){
    spotify.search({type: 'track', query: song}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < process.argv.length; i++){
            var searched = data.tracks.items[i]  
            console.log("Result "+ parseInt(i+1));
            console.log("Artist Name: " + JSON.stringify(searched.artists[0].name).replace(/"/gi,"")); 
            console.log("Song Name: " + JSON.stringify(searched.name).replace(/"/gi,""));
            console.log("Preview Link: " + JSON.stringify(searched.preview_url).replace(/"/gi,""));
            console.log("Album Name: " + JSON.stringify(searched.album.name).replace(/"/gi,""));
            console.log("\n")
        }
       
    })
};

var movieThis = function(movieName){
    var nodeArgs = process.argv;
    // var movieName = "";
    // if (nodeArgs.length > 2) {
    //     for (var i = 2; i < nodeArgs.length; i++) {
    //         if (i > 2 && i < nodeArgs.length) {

    //             movieName = movieName + "+" + nodeArgs[i];

    //         }
    //         else {

    //             movieName += nodeArgs[i];

    //         }
    //     }
    // }
    // else {
    //     movieName = "Mr+Nobody"
    // }

    if (nodeArgs.length = 2){
        movieName = "Mr+Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            
            console.log("Title: " + JSON.parse(body).Title);    
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Origin: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
}

fs.readFile("random.txt", 'utf8', function(err, data) {
    if (err) throw err;
    var holder = data.split(",");
  
    if (holder[0] == "spotify-this-song"){
      WhatSong(holder[1]);
    }
    else if (holder[0] == "my-tweets"){
    tweets();
    }
    else if (holder[0] == "movie-this"){
        
        }
  });