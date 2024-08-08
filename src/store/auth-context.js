import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  fullName: "",
  isAuthenticated: false,
  authenticate: (token, userId, fullName) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState("User");

  function authenticate(token, userId, fullName) {
    setAuthToken(token);
    setUserId(userId);
    setFullName(fullName || "User");
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    setFullName("User");
  }

  const value = {
    token: authToken,
    userId: userId,
    fullName: fullName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
