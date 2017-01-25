var config = {
	apiKey: "AIzaSyAg28hK0R41ivrv8rJ-qFjGPm3kXNW5mzc",
	authDomain: "moodproject-f9187.firebaseapp.com",
	databaseURL: "https://moodproject-f9187.firebaseio.com",
	storageBucket: "moodproject-f9187.appspot.com",
	messagingSenderId: "968909395519"
};
firebase.initializeApp(config);


$("#submit").on('click', function(event){
	event.preventDefault();
	var email = $("#email").val().trim();
	var password = $("#password").val().trim();

	$("#email").val('');
	$("#password").val('');

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  console.log('auth ran');
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorMessage);
	});	

})