import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REGISTER = gql`
  mutation (
    $name: String!
    $email: String!
    $mobile: String!
    $password: String!
  ) {
    register(
      input: {
        user_fullname: $name
        user_email: $email
        user_mobile: $mobile
        password: $password
      }
    )
  }
`;

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [register, { data, loading, error }] = useMutation(REGISTER);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const [modalVisibleFail, setModalVisibleFail] = useState(false);

  const storeData = async (name, email) => {
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", email);
    } catch (e) {
      console.log(e);
    }
  };
  const submit = async () => {
    try {
      const data = await register({
        variables: { name, email, mobile, password },
      });

      console.log(data);
      storeData(name, email);
      setModalVisibleSuccess(true);
    } catch (error) {
      console.log("HERE");
      console.log(error);
      setModalVisibleFail(true);
    }
  };

  const fail = () => {
    setModalVisibleFail(false);
  };

  const backToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSuccess}
        onRequestClose={() => {
          setModalVisibleSuccess(!modalVisibleSuccess);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.success}>{"Register Successfully!"}</Text>
            <TouchableOpacity style={styles.button} onPress={backToLogin}>
              <Text style={{ color: "#FFFFFF", padding: 5 }}>Close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleFail}
        onRequestClose={() => {
          setModalVisibleFail(!modalVisibleFail);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.success}>{"Incorrect Credentials!"}</Text>
            <TouchableOpacity style={styles.button} onPress={fail}>
              <Text style={{ color: "#FFFFFF", padding: 5 }}>Close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account Register</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Full Name</Text>
        <View style={styles.inputContainer}>
          <IconFontAwesome style={styles.iconStyle} name="user" size={40} />
          <TextInput
            style={styles.textInput}
            placeholder={"Enter Your Full Name"}
            onChangeText={(value) => setName(value)}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Email Address</Text>
        <View style={styles.inputContainer}>
          <IconMaterialCommunityIcons
            style={styles.iconStyle}
            name="email"
            size={40}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Enter Your Email Address"}
            onChangeText={(value) => setEmail(value)}
            keyboardType="email-address"
          />
        </View>
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

      <View style={styles.registerView}>
        <TouchableOpacity style={styles.registerButton} onPress={submit}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
  },

  title: {
    fontSize: 30,
    paddingTop: 20,
    fontWeight: "bold",
  },

  text: {
    paddingLeft: 100,
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
    borderRadius: 10,
    marginLeft: 20,
    width: 250,
    backgroundColor: "#f0edeb",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,

    borderRadius: 7,
    width: 250,
    backgroundColor: "#00B2FF",
  },

  loginView: {
    paddingTop: 20,
    alignItems: "center",
    paddingLeft: 45,
  },

  loginText: {
    fontSize: 20,
    padding: 10,
    color: "#FFFFFF",
  },

  loginIcon: {
    paddingRight: 50,
  },

  register: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  registerView: {
    paddingTop: 40,
    alignItems: "center",
  },

  registerButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,

    borderRadius: 7,
    width: 300,
    backgroundColor: "#00B2FF",
    paddingRight: 50,
  },

  registerText: {
    fontSize: 20,
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#FFFFFF",
  },
  textRegister: {
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 5,
    paddingRight: 5,
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
});
