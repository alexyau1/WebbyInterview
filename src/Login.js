import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LOGIN = gql`
  mutation ($mobile: String!, $password: String!) {
    login(input: { user_mobile: $mobile, password: $password }) {
      token
      user {
        user_id
      }
    }
  }
`;

export default function Login({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const [modalVisible, setModalVisible] = useState(false);

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    let token = "wrong token";
    try {
      const data = await login({
        variables: { mobile, password },
      });

      token = data.data.login.token;
      console.log(token);
      storeData(token);
      loginSuccess();
    } catch (e) {
      console.log("HERE");
      console.log(e);
      setModalVisible(true);
    }
  };

  const fail = () => {
    setModalVisible(false);
  };
  const register = () => {
    navigation.navigate("Register");
  };

  const loginSuccess = () => {
    navigation.navigate("Main Page");
  };
  return (
    <View style={styles.background}>
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
            <Text style={styles.success}>
              {"Invalid Phone Number or Password!"}
            </Text>
            <TouchableOpacity style={styles.failButton} onPress={fail}>
              <Text style={{ color: "#FFFFFF", padding: 5 }}>Close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.titleContainer}>
        <IconEvilIcons name="user" size={150} color="#00B2FF" />
        <Text style={styles.title}>Account Login</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <IconFontAwesome style={styles.iconStyle} name="phone" size={40} />
          <TextInput
            style={styles.textInput}
            placeholder={"Enter Your Phone Number"}
            onChangeText={(value) => setMobile(value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>Password</Text>
        <View style={styles.inputContainer}>
          <IconFontAwesome style={styles.iconStyle} name="lock" size={40} />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder={"Enter Your Password"}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
      </View>
      <View style={styles.lineStyle} />
      <View style={styles.loginView}>
        <TouchableOpacity style={styles.loginButton} onPress={submit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={{ fontSize: 20 }}>{"Don't have an Account?  "}</Text>
        <TouchableOpacity onPress={register}>
          <Text style={styles.textRegister}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
  },

  background: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingBottom: 140,
  },
  title: {
    fontSize: 30,
    paddingTop: 20,
    fontWeight: "bold",
  },

  text: {
    paddingLeft: 100,
    fontSize: 17,
  },
  contentContainer: {
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  iconStyle: {
    paddingTop: 5,
  },
  textInput: {
    padding: 10,

    backgroundColor: "#f0edeb",
    borderRadius: 10,
    marginLeft: 20,
    width: 250,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 5,

    borderRadius: 7,
    width: 250,
    backgroundColor: "#00B2FF",
  },

  loginView: {
    paddingTop: 20,
    alignItems: "center",
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,

    borderRadius: 7,
    width: 300,
    backgroundColor: "#00B2FF",
  },
  loginText: {
    fontSize: 20,

    color: "#FFFFFF",
    paddingBottom: 5,
    paddingTop: 5,
  },

  loginIcon: {
    color: "#FFFFFF",
  },

  register: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },

  textRegister: {
    borderRadius: 7,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#FFFFFF",
    backgroundColor: "#00B2FF",
    fontSize: 20,
  },

  lineStyle: {
    borderColor: "#1c1c1e",
    borderBottomWidth: 1,
    padding: 5,
    paddingTop: 10,
    flex: 1,
    justifyContent: "space-evenly",
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

  failButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,

    borderRadius: 7,
    width: 250,
    backgroundColor: "#00B2FF",
  },
});
