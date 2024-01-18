import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from " https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

var firebaseConfig = {
    apiKey: "AIzaSyDlwhX4eNkdzf7E69MynVk0I4JpGvwVADQ",
    authDomain: "my-first-project-d261e.firebaseapp.com",
    projectId: "my-first-project-d261e",
    storageBucket: "my-first-project-d261e.appspot.com",
    messagingSenderId: "392372615722",
    appId: "1:392372615722:web:ddc5c367d69ad917252153"
};

var app = initializeApp(firebaseConfig);
var auth = getAuth(app);

function signupfunc() {
    var email = document.getElementById("signemail");
    var password = document.getElementById("signpass");
    // console.log(email.value  , password.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(function (success) {
            console.log("success", success)
            alert("Successfully signed-up")
            window.location.href = "./index.html "
        })
        .catch(function (error) {
            console.log(error.code, "error")
            alert(error.code)
        })
}

function loginfunc() {
    var email = document.getElementById("logemail");
    var password = document.getElementById("logpass")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(function (success) {
            console.log(success, "success");
            localStorage.setItem("uid", success.user.uid);
            alert("Successfully Logged-in");
            window.location.replace("./dashboard.html")

        })
        .catch(function (error) {
            console.log(error.code, "error");
            alert(error.code)
        })
}

window.addEventListener("load" , function(){
    // console.log("chalrha hai")
    var uid = localStorage.getItem("uid");

    if(uid){
        // console.log(" hai")
        window.location.replace("./dashboard.html")
        return;
    }
})


window.signupfunc = signupfunc;
window.loginfunc = loginfunc;



























