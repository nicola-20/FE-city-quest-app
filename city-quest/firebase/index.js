import firebase from "firebase";

const config = {
 apiKey: "AIzaSyCNArqiZbX3ChYKYMEeGLom-ieH-yk6Jvg",
 authDomain: "treasure-hunt-dcd8e.firebaseapp.com",
 databaseURL: "https://treasure-hunt-dcd8e.firebaseio.com",
 projectId: "treasure-hunt-dcd8e",
 storageBucket: "treasure-hunt-dcd8e.appspot.com",
 messagingSenderId: "382195712102"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };