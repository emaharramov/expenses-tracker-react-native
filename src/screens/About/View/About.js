import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768;

export default function About() {
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, isLargeScreen && styles.largeScrollViewContainer]}
      style={styles.container}
    >
      <View style={[styles.headerContainer, isLargeScreen && styles.largeHeaderContainer]}>
        <Image source={require('../../../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>About Our App</Text>
      </View>
      
      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          Our mission is to create the best possible experience for our users.
          We aim to simplify your daily tasks and provide useful features
          that make your life easier.
        </Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.text}>
          - Feature 1: Description of feature 1.
          {'\n'}- Feature 2: Description of feature 2.
          {'\n'}- Feature 3: Description of feature 3.
        </Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or feedback, feel free to reach out to us at:
          {'\n'}Email: info@emilmaharramov.com
        </Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
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
    backgroundColor: "#f7f9fa",
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  largeScrollViewContainer: {
    alignItems: "stretch",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  largeHeaderContainer: {
    alignItems: "center",
    marginBottom: 30, 
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    width: "100%",
  },
  largeCard: {
    maxWidth: 720, 
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#7f8c8d",
    lineHeight: 22,
  },
});

