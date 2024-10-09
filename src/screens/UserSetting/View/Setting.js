import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../../store/auth-context";
import { updateUserProfile } from "../../../Firebase/firebase";
import axios from "axios";

const API_KEY = "AIzaSyAAHCaJFSnOxmcWPNxFGpSGffqBLwIHe68";

function Setting() {
  const authCtx = useContext(AuthContext);
  const [fullName, setFullName] = useState(authCtx.fullName);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            idToken: authCtx.token,
          }
        );
        const user = response.data.users[0];

        if (user.displayName) {
          setFullName(user.displayName);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        Alert.alert("Error", "Failed to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, [authCtx.token]);

  async function saveChangesHandler() {
    try {
      await updateUserProfile(authCtx.token, fullName, password);
      Alert.alert("Success", "Profile updated successfully!");
      authCtx.authenticate(authCtx.token, authCtx.userId, fullName || authCtx.fullName);
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Settings</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#95a5a6"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#95a5a6"
          />
          <Pressable onPress={saveChangesHandler} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    backgroundColor: "#ecf0f1",
    fontSize: 16,
    color: "#34495e",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Setting;
