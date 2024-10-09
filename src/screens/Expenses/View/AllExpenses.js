import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { AuthContext } from "../../../store/auth-context";
import {
  useExpenses,
  deleteExpense,
  updateExpense,
} from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 768;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const ExpensesList = () => {
  const authCtx = useContext(AuthContext);
  const expenses = useExpenses(authCtx.userId);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  async function deleteItemById(id) {
    try {
      await deleteExpense(authCtx.userId, id);
      Alert.alert("Success", "Expense deleted successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function updateItemById() {
    try {
      await updateExpense(authCtx.userId, selectedExpense.id, {
        description: updatedDescription,
        amount: parseFloat(updatedAmount),
      });
      Alert.alert("Success", "Expense updated successfully!");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setUpdatedDescription(expense.description);
    setUpdatedAmount(expense.amount.toString());
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.row, isLargeScreen && styles.largeRow]}>
      <Text style={[styles.cell, isLargeScreen && styles.largeCell]}>{item.description}</Text>
      <Text style={[styles.cell, isLargeScreen && styles.largeCell]}>{item.amount} $</Text>
      <Text style={[styles.cell, isLargeScreen && styles.largeCell]}>{formatDate(item.date)}</Text>
      <View style={[styles.action, isLargeScreen && styles.largeAction]}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={24}
          color="#3498db"
          onPress={() => openEditModal(item)}
        />
        <AntDesign
          name="delete"
          size={24}
          color="#e74c3c"
          onPress={() => deleteItemById(item.id)}
        />
      </View>
    </View>
  );

  const addExpenseHandler = () => {
    navigation.navigate("AddExpense");
  };

  const renderHeader = () => (
    <View style={[styles.header, isLargeScreen && styles.largeHeader]}>
      <Text style={[styles.cell, styles.headerText, isLargeScreen && styles.largeCell]}>Description</Text>
      <Text style={[styles.cell, styles.headerText, isLargeScreen && styles.largeCell]}>Amount</Text>
      <Text style={[styles.cell, styles.headerText, isLargeScreen && styles.largeCell]}>Date</Text>
      <Text style={[styles.headerText, isLargeScreen && styles.largeHeaderText]}>Actions</Text>
    </View>
  );

  return (
    <View style={[styles.container, isLargeScreen && styles.largeContainer]}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isLargeScreen && styles.largeModalContent]}>
            <Text style={[styles.modalTitle, isLargeScreen && styles.largeModalTitle]}>Edit Expense</Text>
            <TextInput
              placeholder="Description"
              value={updatedDescription}
              onChangeText={setUpdatedDescription}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              value={updatedAmount}
              onChangeText={setUpdatedAmount}
              keyboardType="decimal-pad"
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={updateItemById}>
                <Text style={styles.modalButtonText}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {expenses.length > 0 ? (
        <>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={null}
            style={styles.list}
          />
          <View style={[styles.totalContainer, isLargeScreen && styles.largeTotalContainer]}>
            <Text style={styles.totalText}>Total Expense:</Text>
            <Text style={styles.totalText}>{totalAmount} $</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noDataText}>
            Your expense list is empty. Please add some expenses.
          </Text>
          <Pressable
            onPress={addExpenseHandler}
            style={styles.pressable}
          >
            <Text style={styles.pressableText}>Add Expense</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
    padding: 20,
  },
  largeContainer: {
    paddingHorizontal: 40,
  },
  list: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  largeRow: {
    padding: 20,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },
  largeCell: {
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    gap: 10,
  },
  largeAction: {
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  largeHeader: {
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
  },
  largeHeaderText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  largeModalContent: {
    padding: 30,
    width: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  largeModalTitle: {
    fontSize: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    backgroundColor: "#ecf0f1",
    color: "#34495e",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#f0e1ff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 7,
  },
  largeTotalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#95a5a6",
    marginBottom: 20,
    textAlign: "center",
  },
  pressable: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default ExpensesList;
