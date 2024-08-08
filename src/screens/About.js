import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image } from 'react-native';

export default function About() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>About Our App</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          Our mission is to create the best possible experience for our users.
          We aim to simplify your daily tasks and provide useful features
          that make your life easier.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.text}>
          - Feature 1: Description of feature 1.
          {'\n'}- Feature 2: Description of feature 2.
          {'\n'}- Feature 3: Description of feature 3.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or feedback, feel free to reach out to us at:
          {'\n'}Email: info@emilmaharramov.com
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Developer Info</Text>
        <Text style={styles.text}>
          Developed by: Emil Maharramov
          {'\n'}GitHub: https://github.com/emilmaharramov
          {'\n'}LinkedIn: https://linkedin.com/in/emilmaharramov
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#3c0a6b",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingVertical: 15,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3c0a6b",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3c0a6b",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
});

