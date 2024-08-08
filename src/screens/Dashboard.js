import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { AuthContext } from "../store/auth-context";
import { useExpenses } from "../Firebase/firebase";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const expenses = useExpenses(authCtx.userId);
  const recentExpenses = expenses.slice().reverse().slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Your Dashboard, {authCtx.fullName}!</Text>
        <Text style={styles.subtitle}>
          Here's an overview of your activities
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Monthly Expenses</Text>
        <Image
          source={require("../../assets/planner.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Track your monthly expenses and see where your money goes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Budget Planner</Text>
        <Image
          source={require("../../assets/budget.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Plan your budget effectively with our budget planner tool.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Last 5 Transactions</Text>
        <View style={{ flexDirection: 'column' }}>
          {recentExpenses.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.text}>
                - {item.description}: ${item.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>User Reviews</Text>
        <Text style={styles.quote}>
          "This app has helped me manage my expenses so much better!" - Jane
        </Text>
        <Text style={styles.quote}>
          "Planning my budget is so easy now, great app!" - John
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: "contain",
  },
  quote: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 8,
    flexDirection: 'column-reverse'
  }
});
