var config = {
	apiKey: "AIzaSyAg28hK0R41ivrv8rJ-qFjGPm3kXNW5mzc",
	authDomain: "moodproject-f9187.firebaseapp.com",
	databaseURL: "https://moodproject-f9187.firebaseio.com",
	storageBucket: "moodproject-f9187.appspot.com",
	messagingSenderId: "968909395519"
};
firebase.initializeApp(config);

var database = firebase.database();

var user = null;

// var for each mood
var moodLow = ["puppies", "kittens", "laughing baby", "baby animals", "ice cream"];
var moodMid = ["you can do it", "happy song", "it could be worse", "go the distance", "keep fighting"];
var moodHigh = ["celebration", "oh yeah", "happy day", "success", "winner"];

// CHART AREA
var color = Chart.helpers.color;
window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};


var barChartData = {
    labels: [],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.green).alpha(.75).rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: []
    }]

};


//CHART AREA

 /** Firebase Sign In Quick Start Code
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]
    function toggleSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]

/**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    function initApp() {
      // Result from Redirect auth flow.
      // [START getidptoken]
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // [START_EXCLUDE]
          document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END getidptoken]
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
          document.getElementById('quickstart-account-details').textContent = 'null';
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }

    //End Google UI Quick Start code


// This is the search function
function searchYoutube(score) {
	var search;
    if (score <= 0.33) {
      	search = moodLow[Math.floor(Math.random() * (moodLow.length - 1))];  
      } else if (score <= 0.66) { 
      	search = moodMid[Math.floor(Math.random() * (moodMid.length - 1))];
      } else {                    
     	search = moodHigh[Math.floor(Math.random() * (moodHigh.length - 1))];
      }

	var queryURL = 
        "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=" + search + "&safeSearch=moderate&type=video&videoDefinition=standard&videoDuration=short&videoEmbeddable=true&key=AIzaSyDwJhmvSj0_9LO3Cqc8TaymVi95AsF5KYc";

	$.ajax({
	      url: queryURL,
	      method: 'GET'
	    })
	.done(function(response) {
      console.log(response);
      // Grabs video id from response
      var videoId1 = response.items[0].id.videoId;
      var videoId2 = response.items[1].id.videoId;
      var videoId3 = response.items[2].id.videoId;
      // Inserts video id into url for display
      var videoLink1 = "https://www.youtube.com/watch?v=" + videoId1;
      var videoLink2 = "https://www.youtube.com/watch?v=" + videoId2;
      var videoLink3 = "https://www.youtube.com/watch?v=" + videoId3;
      console.log(videoLink1);
      console.log(videoLink2);
      console.log(videoLink3);
    })      

};

function displayChart() {
      var ctx = document.getElementById("canvas").getContext("2d");
      window.myBar = new Chart(ctx, {
          type: 'bar',
          data: barChartData,
          options: {
              responsive: true,
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Chart.js Bar Chart'
              }
          }
      });

    var colorNames = Object.keys(window.chartColors);
};    


$("#submit").on('click', function(event){
	event.preventDefault();
	var userMood = $("#textarea1").val();
	$("#textarea1").val('');
	//The params variable is the prefered format for the API. Sent the userMood text to the text parameter.
    var params = {
	                "documents": [
	                    {
	                        "language": "en",
	                        "id": "1",
	                        "text": JSON.stringify(userMood),
	                    }
	                ]
            	};
    //This is the ajax call for the Microsoft Azure Text Analytics Sentiment Api    
    $.ajax({
        method: 'POST',
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
        headers:{
          "Content-Type":"application/json",
          "Ocp-Apim-Subscription-Key":"63216139951246bbb219cbec04e4e18d", //brigmanlp subscription key
          "Accept":"application/json"
        },
        data: JSON.stringify(params),
        dataType: 'text',
    })
    .done(function(data) {
        console.log('Here: ' + data);
        $('#responseData').html(data);
		if(firebase.auth().currentUser !== null){
			user = firebase.auth().currentUser;
			data = JSON.parse(data);
			database.ref('users/' + user.uid).push({
				displayName: user.displayName,
				response: data.documents[0].score,
        moment: moment().format('dddd')
			})
			searchYoutube(data.documents[0].score);
		}

    })
    .fail(function(data) {
        alert("error" + JSON.stringify(data));
    });

});

database.ref('users/').on('value', function(snapshot){
	console.log('value runs');
	if(firebase.auth().currentUser !== null){
		console.log(snapshot.val()[firebase.auth().currentUser.uid]);
    var keys = Object.keys(snapshot.val()[firebase.auth().currentUser.uid]);

    if(keys.length >= 7){
      keys = keys.slice(keys.length - 7);
    }

    for (var i = 0; i < keys.length; i++){
      console.log(snapshot.val()[firebase.auth().currentUser.uid][keys[i]]);
      barChartData.labels.push(snapshot.val()[firebase.auth().currentUser.uid][keys[i]].moment);
      barChartData.datasets[0].data.push(snapshot.val()[firebase.auth().currentUser.uid][keys[i]].response);
    }
    displayChart();
	}
});

window.addEventListener('load', initApp);

$(document).ready(function() {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
});
