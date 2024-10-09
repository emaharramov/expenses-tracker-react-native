import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, remove, update } from "firebase/database";
import { useState, useEffect } from 'react';
import axios from "axios";
// require('dotenv').config();

const firebaseConfig = {
  apiKey: "AIzaSyAAHCaJFSnOxmcWPNxFGpSGffqBLwIHe68",
  authDomain: "expense-tracker-app-4b927.firebaseapp.com",
  databaseURL: "https://expense-tracker-app-4b927-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-app-4b927",
  storageBucket: "expense-tracker-app-4b927.appspot.com",
  messagingSenderId: "193297254884",
  appId: "1:193297254884:web:99311361b7e16f0c361ff1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const addExpense = (userId, expense) => {
  const expensesRef = ref(database, `expenses/${userId}`);
  const newExpenseRef = push(expensesRef);
  set(newExpenseRef, expense);
};

const deleteExpense = (userId, expenseId) => {
  const expenseRef = ref(database, `expenses/${userId}/${expenseId}`);
  return remove(expenseRef);
};

const updateExpense = (userId, expenseId, updatedExpense) => {
  const expenseRef = ref(database, `expenses/${userId}/${expenseId}`);
  return update(expenseRef, updatedExpense);
};

const useExpenses = (userId) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const expensesRef = ref(database, `expenses/${userId}`);
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key]
        });
      }
      setExpenses(loadedExpenses);
    });

    return () => unsubscribe();
  }, [userId]);

  return expenses;
};

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyAAHCaJFSnOxmcWPNxFGpSGffqBLwIHe68";

async function updateUserProfile(idToken, fullName, password) {
  const payload = {
    idToken: idToken,
    returnSecureToken: true,
  };

  if (fullName) {
    payload.displayName = fullName;
  }
  if (password) {
    payload.password = password;
  }
  if (fullName && password) {
    payload.displayName = fullName;
    payload.password = password;
  }

  const response = await axios.post(`${BASE_URL}update?key=${API_KEY}`, payload);

  if (response.data) {
    return response.data;
  } else {
    throw new Error("Failed to update profile.");
  }
}

export { database, addExpense, deleteExpense, updateExpense, useExpenses, updateUserProfile  };
