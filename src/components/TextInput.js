import React from "react";
import { View, Text, TextInput as RNTextInput } from "react-native";
import styles from "../styles/styles";

export default function TextInput({ label, style, ...props }) {
  return (
    <View style={styles.inpt}>
      <Text>{label}: </Text>
      <RNTextInput style={[styles.inpts, style]} {...props} />
    </View>
  );
}
