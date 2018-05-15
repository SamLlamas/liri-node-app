var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
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

var WhatSong = function(){
    var song = ""
    if (process.argv.length = 2){
        song = "The Sign"
    }
    for (i = 2; i < process.argv.length; i++){
       song += process.argv[i] + " "
    }
    
    spotify.search({type: 'track', query: song}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < process.argv.length; i++){
            var searched = data.tracks.items[i]
            console.log("Result "+ parseInt(i+1))
            console.log("Artist Name: " + JSON.stringify(searched.artists[0].name).replace(/"/gi,"")); 
            console.log("Song Name: " + JSON.stringify(searched.name).replace(/"/gi,""));
            console.log("Preview Link: " + JSON.stringify(searched.preview_url).replace(/"/gi,""));
            console.log("Album Name: " + JSON.stringify(searched.album.name).replace(/"/gi,""));
            console.log("\n")
        }
       
    })
};
