import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
} from " https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

var firebaseConfig = {
    apiKey: "AIzaSyDlwhX4eNkdzf7E69MynVk0I4JpGvwVADQ",
    authDomain: "my-first-project-d261e.firebaseapp.com",
    projectId: "my-first-project-d261e",
    storageBucket: "my-first-project-d261e.appspot.com",
    messagingSenderId: "392372615722",
    appId: "1:392372615722:web:ddc5c367d69ad917252153"
};

var app = initializeApp(firebaseConfig);

var db = getFirestore(app);

var parent = document.getElementById("parent");

var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
});
// console.log(myModal)



window.addEventListener("load", async function (doc) {
    var uid = localStorage.getItem("uid");
    if (!uid) {
        window.location.replace("./index.html")
        return;
    }
    var postarray = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        postarray.push({
            title: doc.data().title,
            desc: doc.data().desc,
            uid: doc.data().uid,
            privatecheck: doc.data().privatecheck,
        })
    })
    console.log(value.privatecheck)
    for (var value of postarray) {
        parent.innerHTML += await renderUI(
            value.title,
            value.desc,
            )
    }

})

async function createPost() {
    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var uid = localStorage.getItem("uid");

    var blogObj = {
        title: title.value,
        desc: desc.value,
        uid: uid,
    }

    const docRef = await addDoc(collection(db, "posts"), blogObj);
    console.log("docref ", docRef);

    parent.innerHTML += await renderUI(
        title.value,
        desc.value,
    )
    // console.log(desc.value.length)
    
    // }
    myModal.hide();
    title.value = "";
    desc.value = "";
}

async function renderUI(title, desc, uid, id) {
    var cardUI = `<div class="container mt-5" >

    <div class="card">
        <h5 class="card-header"> ${title} </h5>
        <div class="card-body">
          <p class="card-text"> ${desc} </p>
          <a href="#"  id=${id} onclick="deletePost(this)" class="btn btn-danger">Delete</a>
          <a href="#" class="btn btn-warning">Edit</a>

        </div>
      </div>

</div>`
    return cardUI;
}
function deleteitlater(){
    console.log("delete it later")
}

myModal.hide()

async function deletePost(ele) {
    var postId = ele.id;
    await deleteDoc(doc(db, "posts", postId));
    console.log("delete");
}












window.createPost = createPost;
window.deletePost = deletePost;




