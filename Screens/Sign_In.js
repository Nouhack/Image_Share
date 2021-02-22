import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { Colors } from "../Colors";
import { useDispatch } from "react-redux";
import firebase from "../firebaseConf";

const SignIn = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("logIn secussful !!!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("signin Error : ", errorCode, errorMessage);
        Alert.alert("Authentification failed", "Email or Password are wrong", [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      });
  };

  const vErification = () => {
    if (email.length > 0 && password.length > 0) {
      signIn(email, password);
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
        <Image
          style={styles.logoContainer}
          source={require("../assets/logo.png")}
        />
        <TextInput
          style={styles.Input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          style={styles.Input}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={(text) => setpassword(text)}
        />

        <TouchableOpacity style={styles.buttonCustomed} onPress={vErification}>
          <Text>Sign In </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, fontWeight: "bold" }}>
          Sign Up ?
          <Text
            style={{ color: "red" }}
            onPress={() => {
              navigation.navigate("Sign Up");
            }}
          >
            {" "}
            Create an account
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
  logoContainer: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
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

export default SignIn;
