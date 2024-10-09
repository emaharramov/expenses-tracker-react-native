import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../../store/auth-context';
import { addExpense } from '../../../Firebase/firebase';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth > 768;

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
      date: new Date().toISOString(),
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollViewContainer, isLargeScreen && styles.largeScrollViewContainer]}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, isLargeScreen && styles.largeCard]}>
          <Ionicons name="add-circle-outline" size={60} color="#3498db" style={styles.icon} />
          <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>Add New Expense</Text>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={[styles.input, isLargeScreen && styles.largeInput]}
            placeholderTextColor="#95a5a6"
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, isLargeScreen && styles.largeInput]}
            placeholderTextColor="#95a5a6"
          />
          <TouchableOpacity style={[styles.button, isLargeScreen && styles.largeButton]} onPress={submitHandler}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  largeScrollViewContainer: {
    paddingHorizontal: 40,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  largeCard: {
    maxWidth: 500,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  largeTitle: {
    fontSize: 28,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#ecf0f1',
    fontSize: 16,
    color: '#34495e',
  },
  largeInput: {
    fontSize: 18,
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  largeButton: {
    paddingVertical: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default AddExpense;
