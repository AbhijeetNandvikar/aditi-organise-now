var provider = new firebase.auth.GoogleAuthProvider();

function redirectToDashboardIfUserLoggedIn() {
  const user = firebase.auth().currentUser;

  if (user) {
    window.location.href = "dashboard.html";
  }
}

function redirectToLoginIfUserNotLoggedIn() {
  const user = firebase.auth().currentUser;

  if (!user) {
    window.location.href = "index.html";
  }
}

function createAccount() {
  var email = document.getElementById("email-input").value;
  var password = document.getElementById("password-input").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      console.log("Account created for " + user.email);
      redirectToDashboardIfUserLoggedIn();

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}

function loginWithEmail() {
  var email = document.getElementById("email-input").value;
  var password = document.getElementById("password-input").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      console.log("Logged in with email " + user.email);
      redirectToDashboardIfUserLoggedIn();

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}

function loginWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
      console.log("Logged in with Google as " + user.email);
      redirectToDashboardIfUserLoggedIn();
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Logged out");
      redirectToLoginIfUserNotLoggedIn();
    })
    .catch((error) => {
      // An error happened.
      console.log("Error logging out");
      redirectToLoginIfUserNotLoggedIn();
    });
}

function renderChart() {
  var ctx = document.getElementById("my-chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie", // specify the type of chart (bar, line, pie, etc.)
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
