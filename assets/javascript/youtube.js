// var for each mood
var moodLow = ["puppies", ""];
var moodMid = [];
var moodHigh = [];

// This is the search var
function search() {
	if (mood <= 1/3) {
  		console.log("low");
		} else if (mood <= 2/3) { 
  		console.log("mid");
		} else {                    
  		console.log("high");
		}
	};

//This is the queryURL for the ajax 
var queryURL = 
	"http://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=" + search + "&safeSearch=moderate&type=video&videoDefinition=standard&videoDuration=short&videoEmbeddable=true&key=AIzaSyCGMvVG5K-LtfM2yacVG4hiPz3xp9zNCZc"  

//ajax to get response from queryURL
$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
    });
    
//This will be video ID from returned array for next step
var videoID = //id from returned array

//This link will go to video
var videoLink =	"https://www.youtube.com/watch?v=" + videoID ;