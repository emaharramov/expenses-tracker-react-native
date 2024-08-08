import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../store/auth-context";
import { updateUserProfile } from "../Firebase/firebase";
import axios from 'axios';

const API_KEY = "AIzaSyAAHCaJFSnOxmcWPNxFGpSGffqBLwIHe68";

function Setting() {
  const authCtx = useContext(AuthContext);
  const [fullName, setFullName] = useState(authCtx.fullName);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
          idToken: authCtx.token
        });
        const user = response.data.users[0];
        if (user.displayName) {
          setFullName(user.displayName);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [authCtx.token]);

  async function saveChangesHandler() {
    try {
      const response = await updateUserProfile(authCtx.token, fullName, password);
      authCtx.authenticate(authCtx.token, authCtx.userId, fullName || authCtx.fullName);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={saveChangesHandler} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3c0a6b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Setting;
