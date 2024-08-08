import React, { useState, useContext } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { createUser, loginUser } from "../utils/Auth";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import loginRegisterStyles from "../styles/LoginRegisterStyles";

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  async function authHandler() {
    if (!email.includes("@") || password.length < 6) {
      Alert.alert(
        "Invalid input",
        "Please enter a valid email and password (min 6 characters)."
      );
      return;
    }
    try {
      let response;
      if (isLogin) {
        response = await loginUser(email, password);
        console.log(response);
        
        if (response && response.idToken) {
          authCtx.authenticate(response.idToken, response.localId, response.displayName || "User");
          Alert.alert("Success", "Account logged in successfully!");
          navigation.navigate("Dashboard");
        }
      } else {
        response = await createUser(email, password);
        if (response && response.localId) {
          authCtx.authenticate(response.idToken, response.localId, response.displayName || "User");
          Alert.alert("Success", "Account created successfully!");
          navigation.navigate("AddExpense");
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Register");
    } else {
      navigation.navigate("Login");
    }
  }

  return (
    <ScrollView
      contentContainerStyle={loginRegisterStyles.scrollViewContainer}
      style={loginRegisterStyles.container}
    >
      <View style={loginRegisterStyles.headerContainer}>
        <Text style={loginRegisterStyles.title}>{isLogin ? "Login" : "Register"}</Text>
      </View>

      <View style={loginRegisterStyles.card}>
        <View style={loginRegisterStyles.inpt}>
          <Text>Email: </Text>
          <TextInput
            placeholder="Email"
            style={loginRegisterStyles.inpts}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={loginRegisterStyles.inpt}>
          <Text>Password: </Text>
          <View style={loginRegisterStyles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={[loginRegisterStyles.inpts, loginRegisterStyles.passwordInput]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={loginRegisterStyles.eyeIcon}
            >
              <Text>{showPassword ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={authHandler} style={loginRegisterStyles.press}>
          <Text style={loginRegisterStyles.text}>{isLogin ? "Login" : "Register"}</Text>
        </Pressable>

        <View style={loginRegisterStyles.inpt}>
          <Text style={loginRegisterStyles.textCenter}>
            {isLogin ? "If you don't have an account, create one" : "Already registered?"}
          </Text>
          <Pressable onPress={switchAuthModeHandler} style={loginRegisterStyles.link}>
            <Text style={loginRegisterStyles.linkText}>{isLogin ? "Create New Account" : "Login"}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}