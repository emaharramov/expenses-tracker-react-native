import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const navigation = useNavigation();
  const isLargeScreen = screenWidth > 768;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, isLargeScreen && styles.largeScrollViewContainer]}
      style={styles.container}
    >
      <View style={[styles.card,styles.cardFirst, isLargeScreen && styles.largeCard]}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          Easily track your expenses, plan your budget, and take control of your
          spending.
        </Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.subtitle}>Features and Benefits</Text>
        <Text style={styles.text}>Easily Track Your Expenses</Text>
        <Text style={styles.text}>Budget Planner</Text>
        <Text style={styles.text}>Categorize Your Spending</Text>
        <Text style={styles.text}>Expense Analysis Charts</Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.subtitle}>App Screenshots</Text>
        <View style={[styles.imageContainer, isLargeScreen && styles.largeImageContainer]}>
          <Image
            source={require('../../../../assets/app.png')}
            style={[styles.image, isLargeScreen && styles.largeImage]}
          />
          <Image
            source={require('../../../../assets/app2.png')}
            style={[styles.image, isLargeScreen && styles.largeImage]}
          />
        </View>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={styles.subtitle}>User Reviews</Text>
        <Text style={styles.quote}>
          "This app has helped me manage my expenses so much better!" - Jane
        </Text>
        <Text style={styles.quote}>
          "Planning my budget is so easy now, great app!" - John
        </Text>
      </View>

      <View style={[styles.buttonContainer, isLargeScreen && styles.largeButtonContainer]}>
        <Pressable
          style={[styles.btnPress, isLargeScreen && styles.largeBtnPress]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        <Pressable
          style={[styles.btnPress, isLargeScreen && styles.largeBtnPress]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

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
  cardFirst: {
    marginTop: 20
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    color: "#95a5a6",
    fontStyle: "italic",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  largeImageContainer: {
    justifyContent: 'center',
    gap: 30,
  },
  image: {
    width: "48%", 
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  largeImage: {
    width: "45%", 
    height: 250,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  largeButtonContainer: {
    justifyContent: "center", 
  },
  btnPress: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  largeBtnPress: {
    width: 200,
    marginHorizontal: 10,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
