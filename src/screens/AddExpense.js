import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { addExpense } from '../Firebase/firebase';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const authCtx = useContext(AuthContext);

  const submitHandler = () => {
    if (!amount || !description) {
      Alert.alert('Invalid input', 'Please provide both amount and description.');
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString()
    };

    try {
      addExpense(authCtx.userId, expenseData);
      Alert.alert('Success', 'Expense added successfully!');
      setAmount('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>
      <TextInput 
        placeholder="Amount" 
        value={amount} 
        onChangeText={setAmount} 
        keyboardType="decimal-pad" 
        style={styles.input}
      />
      <TextInput 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3c0a6b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddExpense;
