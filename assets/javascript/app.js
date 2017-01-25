// querlyURL for Youtube Data API
var queryUrl = "http://developers.google.com/youtube/v3/?hl=en?api_key=AIzaSyCGMvVG5K-LtfM2yacVG4hiPz3xp9zNCZc";

$.ajax({
	url: queryURL,
	method: 'GET'
}).done(function(response) {
	console.log(response);
});