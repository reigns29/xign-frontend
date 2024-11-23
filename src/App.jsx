import React, { useState, useEffect } from "react";
import LoginPage from "./components/login";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  if (!user) return <LoginPage setUser={setUser} />;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
