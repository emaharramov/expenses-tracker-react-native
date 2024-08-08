import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          Easily track your expenses, plan your budget, and take control of your
          spending.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Features and Benefits</Text>
        <Text style={styles.text}>Easily Track Your Expenses</Text>
        <Text style={styles.text}>Budget Planner</Text>
        <Text style={styles.text}>Categorize Your Spending</Text>
        <Text style={styles.text}>Expense Analysis Charts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>App Screenshots</Text>
        <Image
          source={{ uri: "https://example.com/screenshot1.png" }}
          style={styles.image}
        />
        <Image
          source={{ uri: "https://example.com/screenshot2.png" }}
          style={styles.image}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>User Reviews</Text>
        <Text style={styles.quote}>
          "This app has helped me manage my expenses so much better!" - Jane
        </Text>
        <Text style={styles.quote}>
          "Planning my budget is so easy now, great app!" - John
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.btnPress}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.btn}>Sign Up</Text>
        </Pressable>

        <Pressable
          style={styles.btnPress}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btn}>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30, // Added padding to the top and bottom
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3c0a6b",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
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
  quote: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  btnPress: {
    backgroundColor: "#3c0a6b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "48%", // Bu, butonların yan yana daha iyi oturmasını sağlar.
  },
  btn: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
