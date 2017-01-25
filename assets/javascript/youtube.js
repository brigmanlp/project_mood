//This var will hold the search paramater for each mood
var seach = $("currentmood").val();

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