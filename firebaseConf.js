import firebaseBase from "firebase";

var firebaseConfig = {
  //TODO
  //ADD YOU FIREBASE CONFIG HERE AND DONT FORGET TO ENABLE AUTHENTICATION AND REAL TIME DATABASE AND STORAGE SERVICES
};

if (firebaseBase.apps.length === 0) {
  firebaseBase.initializeApp(firebaseConfig);
}

export default firebaseBase;
