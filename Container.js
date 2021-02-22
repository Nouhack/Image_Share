import React, { useState, useEffect } from "react";
import AuthStackNav from "./navigator/StackNavigators/AuthentificationStack";
import firebase from "./firebaseConf";
import MainScreen from "./navigator/StackNavigators/AppTabs";

export default function Container() {
  const [content, setcontent] = useState(null);
  const [authUset, setuser] = useState(null);
  //const token = useSelector((state) => state.usetToken);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setcontent(<MainScreen />);
        setuser(user);
      } else {
        setcontent(<AuthStackNav />);
      }
    });
  }, [authUset]);
  return content;
}
