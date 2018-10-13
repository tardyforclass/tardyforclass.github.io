
function getUiConfig() {
  return {
    'callbacks': {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
     //getting the number after login
      debugger;
      var phoneNumber = authResult.user.phoneNumber;
     localStorage.setItem('phoneNumber', firebase.auth().currentUser.phoneNumber.toString());
        //confirm(document.getElementById("phone").innerHTML)
       // localStorage.setItem('PhoneNumber', document.getElementById("phone").innerHTML);
        //localStorage['phoneNumber'] = firebase.auth().currentUser.phoneNumber.toString(); // this line should be in the callback method of the Login  = firebase.auth().currentUser.phoneNumber.toString(); // this line should be in the callback method of the Login 
        //var phone = localStorage.setItem('phoneNumber', firebase.auth().currentUser.phoneNumber.toString());
       // console.log(document.getElementById("phone").innerHTML)
       // confirm(document.getElementById("phone").innerHTML)
      return true;
    },
      // Called when the user has been successfully signed in.
       
    
    },
    // Opens IDP Providers sign-in flow in a popup.
    'signInSuccessUrl':  "https://vkprakash.github.io/carryr/home.html",
    'signInFlow': 'popup',
    'signInOptions': [
      // The Provider you need for your app. We need the Phone Auth
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // another option is 'audio'
          size: 'normal', // other options are 'normal' or 'compact'
          badge: 'bottomleft' // 'bottomright' or 'inline' applies to invisible.
        },
      }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com'
  };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  document.getElementById('phone').textContent = user.phoneNumber;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
  firebase.auth().currentUser.delete().catch(function(error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too old. She needs to sign in again.
      firebase.auth().signOut().then(function() {
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      });
    }
  });
};

/**
 * Initializes the app.
 */
var initApp = function() {
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  document.getElementById('delete-account').addEventListener(
      'click', function() {
        deleteAccount();
      });
};

window.addEventListener('load', initApp);
