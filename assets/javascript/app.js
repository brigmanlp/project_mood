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


$("#submit").on('click', function(event){
	event.preventDefault();

	if(firebase.auth().currentUser !== null){
		user = firebase.auth().currentUser;
		var text = $("#textarea1").val().trim();

		database.ref('users/' + user.uid).push({
			displayName: user.displayName
		})
	}

});

database.ref('users/').on('child_added', function(snapshot){
	console.log('child added runs');
	if(firebase.auth().currentUser !== null){
		console.log(snapshot.val()[firebase.auth().currentUser.uid]);
	}
});

window.addEventListener('load', initApp);
