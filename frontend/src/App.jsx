import React from "react";
import "./style.scss";
import { useAuth } from "./features/auth/hooks/useAuth.jsx";
const App = () => {
  const { user } = useAuth();
  return <h1>Welcome {user ? `${user.username}` : "Guest"} to Instagram!!</h1>;
};

export default App;
