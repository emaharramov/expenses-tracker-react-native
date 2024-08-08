import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Alert } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import Home from "./src/screens/Home";
import About from "./src/screens/About";
import Login from "./src/screens/Login"; // AuthForm bileşenini kullanan Login bileşeni
import Register from "./src/screens/Register"; // AuthForm bileşenini kullanan Register bileşeni
import Dashboard from "./src/screens/Dashboard";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import Expenses from "./src/screens/Expenses";
import AddExpense from "./src/screens/AddExpense";
import Setting from "./src/screens/Setting";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "black",
        drawerActiveBackgroundColor: "#f0e1ff",
        drawerActiveTintColor: "#3c0a6b",
        drawerContentStyle: {
          borderWidth: 1,
          borderColor: "#333",
          borderStyle: "solid",
        },
        drawerIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
        headerRight: () => (
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Login")}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home Page",
          drawerLabel: "Home Page",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          title: "About Page",
          drawerLabel: "About Page",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login} // AuthForm bileşenini kullanan Login bileşeni
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register} // AuthForm bileşenini kullanan Register bileşeni
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    authCtx.logout();
    Alert.alert("Success", "Account logout successfully!");
  }

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={() => ({
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "black",
        drawerActiveBackgroundColor: "#f0e1ff",
        drawerActiveTintColor: "#3c0a6b",
        drawerContentStyle: {
          borderWidth: 1,
          borderColor: "#333",
          borderStyle: "solid",
        },
        drawerIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={"black"} />
        ),
        headerRight: () => (
          <AntDesign
            name="logout"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={logoutHandler}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyExpenses"
        component={Expenses}
        options={{
          title: "All Expenses",
          drawerLabel: "All Expenses",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6
              name="money-bill-transfer"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          title: "Add Expense",
          drawerLabel: "Add Expense",
          drawerIcon: ({ color, size }) => (
            <Entypo name="add-to-list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          title: "User Information",
          drawerLabel: "User Information",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {authContext.isAuthenticated ? <AuthenticatedStack /> : <MainDrawer />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AuthContextProvider>
  );
}
