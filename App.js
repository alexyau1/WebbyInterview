import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./src/Register";
import Login from "./src/Login";
import Logout from "./src/Logout";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import makeApolloClient from "./src/apollo";

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState("");
  const [client, setClient] = useState(null);

  const fetchSession = async () => {
    retrieveData();
    const client = makeApolloClient(token);
    setClient(client);
  };

  const retrieveData = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("token");

      if (tokenValue !== null) {
        setToken(tokenValue);
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    ``;
    return <View />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Login"}
            component={Login}
            options={{
              headerStyle: { backgroundColor: "#00B2FF" },
              headerTintColor: "#FFFFFF",
            }}
          />
          <Stack.Screen
            name={"Register"}
            component={Register}
            options={{
              headerStyle: { backgroundColor: "#00B2FF" },
              headerTintColor: "#FFFFFF",
            }}
          />
          <Stack.Screen
            name={"Main Page"}
            component={Logout}
            options={{
              headerStyle: { backgroundColor: "#00B2FF" },
              headerTintColor: "#FFFFFF",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
