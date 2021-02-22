import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "../firebaseConf";
import logo from "../assets/logo.png";
import axios from "axios";
import { Colors } from "../Colors";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../store/actionCreators";

const SignUp = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [comfirmedpassword, setcomfirmedpassword] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("user has been created secussfuly !!!!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("erro: ", errorCode, errorMessage);
        // ..
      });
  };

  const vErification = () => {
    if (
      password === comfirmedpassword &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      comfirmedpassword.length > 0
    ) {
      signUp(email, password);
    } else {
      Alert.alert("ERROE", "SOMETHING WENT WRONG", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <View style={styles.MainScreen}>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.Input}
          placeholder="username"
          onChangeText={(text) => setusername(text)}
        />
        <TextInput
          style={styles.Input}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          style={styles.Input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
        />
        <TextInput
          style={styles.Input}
          placeholder="comfirme password"
          secureTextEntry={true}
          onChangeText={(text) => setcomfirmedpassword(text)}
        />

        <TouchableOpacity style={styles.buttonCustomed} onPress={vErification}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, fontWeight: "bold" }}>
          Do you already have an account ?
          <Text
            style={{ color: "red" }}
            onPress={() => {
              navigation.navigate("Sign In");
            }}
          >
            {" "}
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

/* 

<View style={styles.InputContainer}>
       

        <TextInput style={styles.Input} placeholder="email" />
        <TextInput style={styles.Input} placeholder="password" />

        <TouchableOpacity style={styles.buttonCustomed}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>

*/
const styles = StyleSheet.create({
  MainScreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  InputContainer: {
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 30,
    elevation: 10,
    borderRadius: 8,
  },
  Input: {
    width: "100%",
    borderBottomColor: Colors.SECOND_COLOR,
    borderBottomWidth: 2,
    marginVertical: 20,
    fontSize: 15,
  },
  buttonCustomed: {
    backgroundColor: Colors.PRIMARY_COLOR,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
});

export default SignUp;
