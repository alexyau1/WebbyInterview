import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from "react-native";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGOUT = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

export default function Logout({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");
  const [logoutMuation, { data, loading, error }] = useMutation(LOGOUT);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    retrieveData();
  });

  const submit = async () => {
    try {
      const data = await logoutMuation();
      console.log(data);
      logout();
    } catch (error) {
      console.log("HERE");
      console.log(error);
    }
  };

  const logoutSelection = () => {
    setModalVisible(true);
  };

  const misclick = () => {
    setModalVisible(false);
  };

  const retrieveData = async () => {
    try {
      const nameValue = await AsyncStorage.getItem("name");
      const emailValue = await AsyncStorage.getItem("email");
      if (nameValue !== null && emailValue !== null) {
        setName(nameValue);
        setEmail(emailValue);
      }
    } catch (e) {}
  };
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  const logout = () => {
    clearAsyncStorage();
    navigation.navigate("Login");
  };
  return (
    <View style={styles.background}>
      <Image style={styles.image} source={require("../assets/welcome.jpg")} />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={styles.textStyle}>{email}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.success}>{"Are you sure?"}</Text>
            <View style={styles.selectionView}>
              <TouchableOpacity style={styles.selectionButton} onPress={logout}>
                <Text style={{ color: "#FFFFFF", padding: 5 }}>Yes </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectionButton}
                onPress={misclick}
              >
                <Text style={{ color: "#FFFFFF", padding: 5 }}>No </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.lineStyle} />

      <View style={styles.logoutView}>
        <TouchableOpacity style={styles.button} onPress={logoutSelection}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 350,
  },
  background: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  textContainer: {
    alignItems: "center",
  },

  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00B2FF",
    fontStyle: "italic",
    paddingTop: 10,
    fontFamily: "sans-serif",
  },

  lineStyle: {
    borderColor: "#1c1c1e",
    borderBottomWidth: 1,
    paddingBottom: 60,
    flex: 1,
    justifyContent: "space-evenly",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
    borderRadius: 7,
    width: 250,
    backgroundColor: "#00B2FF",
  },

  logoutView: {
    paddingTop: 50,
    alignItems: "center",
    paddingBottom: 170,
  },

  logoutText: {
    fontSize: 20,
    padding: 10,
    color: "#FFFFFF",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  success: {
    paddingBottom: 30,
    fontSize: 20,
  },

  selectionButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
    margin: 3,
    borderRadius: 7,
    width: 125,
    backgroundColor: "#00B2FF",
  },

  selectionView: {
    flexDirection: "row",
  },
});
