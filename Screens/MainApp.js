import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../Colors";
import firebase from "../firebaseConf";

const MainScreen = ({ navigation }) => {
  // const token = useSelector((state) => state.usetToken);
  const [imageArray, setImageArray] = useState([]);
  const [loadedContent, setLoadedContent] = useState(true);
  const screenheight = Dimensions.get("window").height;

  useEffect(() => {
    console.log("oui khou");
    var refref = firebase.database().ref("images");
    refref.on("value", async (snap) => {
      let data = await snap.val();
      if (data) {
        let requests = [...imageArray];

        for (let item in data) {
          console.log("rani fel push ....");
          requests.push(data[item].imageURL);
        }
        console.log("rani hna khu");
        setImageArray(requests);
      }
      setLoadedContent(false);
    });
  }, []);

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("log out sucessful !!!!!!");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const RenderItem = ({ item }) => {
    return (
      <Image
        style={{
          width: "100%",
          height: screenheight,
          resizeMode: "cover",
          marginVertical: 20,
        }}
        source={{
          uri: item,
        }}
      />
    );
  };
  return (
    <View style={styles.MainContainer}>
      {loadedContent ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
      ) : imageArray.length > 0 ? (
        <FlatList
          data={imageArray}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1, width: "100%" }}
        />
      ) : (
        <Text> No image Taken yet... </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default MainScreen;
