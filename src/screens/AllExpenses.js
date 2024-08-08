import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useExpenses } from "../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const ExpensesList = () => {
  const authCtx = useContext(AuthContext);
  const expenses = useExpenses(authCtx.userId);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{item.amount} $</Text>
      <Text style={styles.cell}>{formatDate(item.date)}</Text>
    </View>
  );

  const addExpenseHandler = () => {
    navigation.navigate("AddExpense");
  };

  return (
    <View style={styles.container}>
      {expenses.length > 0 ? (
        <View style={styles.header}>
          <Text style={[styles.cell, styles.headerText]}>Description</Text>
          <Text style={[styles.cell, styles.headerText]}>Amount</Text>
          <Text style={[styles.cell, styles.headerText]}>Date</Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noDataText}>
            Your expense list is empty. Please add some expenses.
          </Text>
            <Pressable onPress={addExpenseHandler} style={styles.pressable}>
              <Text style={styles.pressableText}>Add Expense</Text>
            </Pressable>
        </View>
      )}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0e1ff",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: '#3c0a6b',
    marginVertical: 12,
    padding: 10,
    borderRadius: 8
  },
  pressableText: {
    fontSize: 17,
    overflow: 'hidden',
    color: '#fff'
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  noDataText: {
    textAlign: "justify",
    fontSize: 18,
  },
});

export default ExpensesList;
