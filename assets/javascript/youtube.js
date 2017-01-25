var seach = $("currentmood").val();

var queryURL = 
	"http://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=" + search + "&safeSearch=moderate&type=video&videoDefinition=standard&videoDuration=short&videoEmbeddable=true&key=AIzaSyCGMvVG5K-LtfM2yacVG4hiPz3xp9zNCZc"  

	