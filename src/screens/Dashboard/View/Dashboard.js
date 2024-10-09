import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { AuthContext } from "../../../store/auth-context";
import { useExpenses } from "../../../Firebase/firebase";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 768;

export default function Dashboard() {
  
  const authCtx = useContext(AuthContext);
  const expenses = useExpenses(authCtx.userId);

  const groupExpensesByMonth = () => {
    const grouped = {};

    expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth();
      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] += expense.amount;
    });

    const monthlyExpenses = Array.from({ length: 12 }, (_, i) => grouped[i] || 0);
    return monthlyExpenses;
  };

  const getLastSixMonths = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const lastSixMonths = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      lastSixMonths.push(monthNames[monthIndex]);
    }

    return lastSixMonths;
  };

  const barData = {
    labels: getLastSixMonths(), 
    datasets: [
      {
        data: groupExpensesByMonth().slice(-6),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>
          Welcome to Your Dashboard, {authCtx.fullName}!
        </Text>
        <Text style={[styles.subtitle, isLargeScreen && styles.largeSubtitle]}>
          Here's an overview of your activities
        </Text>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={[styles.sectionTitle, isLargeScreen && styles.largeSectionTitle]}>Monthly Expenses</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            data={barData}
            width={isLargeScreen ? 700 : screenWidth - 60} 
            height={220} 
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#f0e1ff",
              backgroundGradientFrom: "#f0e1ff",
              backgroundGradientTo: "#f0e1ff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForBackgroundLines: {
                strokeWidth: 1,
                stroke: "#f0e1ff",
              },
            }}
            style={styles.chart}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={true}
          />
        </View>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={[styles.sectionTitle, isLargeScreen && styles.largeSectionTitle]}>Last 5 Transactions</Text>
        <View style={styles.transactionsContainer}>
          {expenses.slice().reverse().slice(0, 5).map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.text}>
                - {item.description}: ${item.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, isLargeScreen && styles.largeCard]}>
        <Text style={[styles.sectionTitle, isLargeScreen && styles.largeSectionTitle]}>User Reviews</Text>
        <Text style={[styles.quote, isLargeScreen && styles.largeQuote]}>
          "This app has helped me manage my expenses so much better!" - Jane
        </Text>
        <Text style={[styles.quote, isLargeScreen && styles.largeQuote]}>
          "Planning my budget is so easy now, great app!" - John
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
    padding: 20,
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
    width: isLargeScreen ? '90%' : '100%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  largeTitle: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 5,
    textAlign: "center",
  },
  largeSubtitle: {
    fontSize: 18,
  },
  grafik: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 15,
  },
  largeSectionTitle: {
    fontSize: 24,
  },
  chartWrapper: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  transactionsContainer: {
    flexDirection: "column",
  },
  listItem: {
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    color: "#95a5a6",
    fontStyle: "italic",
    marginBottom: 10,
  },
  largeQuote: {
    fontSize: 18,
  },
});
