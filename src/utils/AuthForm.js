import React, { useState, useContext } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from "react-native";
import { createUser, loginUser } from "./Auth";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768;

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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollViewContainer, isLargeScreen && styles.largeScrollViewContainer]}
        style={styles.container}
      >
        <View style={[styles.headerContainer, isLargeScreen && styles.largeHeaderContainer]}>
          <Ionicons name="person-circle" size={isLargeScreen ? 150 : 100} color="#2c3e50" />
          <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>{isLogin ? "Welcome Back!" : "Create an Account"}</Text>
        </View>

        <View style={[styles.card, isLargeScreen && styles.largeCard]}>
          <View style={[styles.inputContainer, isLargeScreen && styles.largeInputContainer]}>
            <Ionicons name="mail-outline" size={20} color="#2c3e50" style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={[styles.input, isLargeScreen && styles.largeInput]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={[styles.inputContainer, isLargeScreen && styles.largeInputContainer]}>
            <Ionicons name="lock-closed-outline" size={20} color="#2c3e50" style={styles.icon} />
            <TextInput
              placeholder="Password"
              style={[styles.input, isLargeScreen && styles.largeInput]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#95a5a6"
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeIcon}
            >
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#2c3e50" />
            </Pressable>
          </View>

          <Pressable onPress={authHandler} style={[styles.button, isLargeScreen && styles.largeButton]}>
            <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
          </Pressable>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <Pressable onPress={switchAuthModeHandler}>
              <Text style={styles.switchLink}>{isLogin ? "Sign Up" : "Login"}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  largeScrollViewContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  largeHeaderContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  largeTitle: {
    fontSize: 34,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  largeCard: {
    width: '80%',
    maxWidth: 600,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  largeInputContainer: {
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#34495e',
  },
  largeInput: {
    fontSize: 18,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  largeButton: {
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  switchLink: {
    fontSize: 16,
    color: '#2980b9',
    marginLeft: 5,
  },
});
