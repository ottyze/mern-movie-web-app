import './App.css';
import Movies from "./Movies";
import Register from './Register';
import SignIn from './SignIn';
import CookieBanner from './CookieBanner';
import { useAppContext } from './AppContext';
import { useState, useEffect } from 'react';



function App() {
  const { userEmail, setEmail } = useAppContext();
  const [currentScreen, setCurrentScreen] = useState("MOVIES");
  const [userName, setUserName] = useState("");
  const isAuthenticated = userName !== "";


  const onAuthButton = (name) => {
    setCurrentScreen(currentScreen === name ? "MOVIES" : name);
  };
  
  const setAuth = (name) => {
    setUserName(name);
    setCurrentScreen("MOVIES");
  };
  const signOut = async() => {
    if(!isAuthenticated){
      return
    }
    setEmail("");
    const response = await fetch('http://localhost:3030/signout', {
      method: 'POST',
      credentials: 'include', 
    });
    if (response.ok) {
      setUserName(""); 
      alert("You have been Signed Out.");
    } 
  };


  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("Checking Auth");
      try {
        const response = await fetch('http://localhost:3030/auth-status', {
          method: 'POST',
          credentials: 'include',
        });
        if (response.status !== 200) {
          signOut();
          return;
        }
        const data = await response.json();
        if (!isAuthenticated) {
          setAuth(data.userName);
          setEmail(data.email);
        }
      } catch {
        alert("An unknown Error has occured")
      }
    };
  
    checkAuthStatus();
  
    const interval = setInterval(checkAuthStatus, 60000);
  
    return () => clearInterval(interval);
  
  }, [isAuthenticated]);


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">NETCLIX</h1>
        <div className="nav-btns">
          {!isAuthenticated && (
            <button className="register" onClick={() => onAuthButton("REGISTER")}>Register</button>
          )}
          {!isAuthenticated && (
            <button className="sign-in" onClick={() => onAuthButton("SIGNIN")}>Sign In</button>
          )}
          {isAuthenticated && (
            <div className="user-name"><p>{userName}</p></div>
          )}
          {isAuthenticated && (
            <button className="sign-out" onClick={signOut}>Sign Out</button>
          )}
        </div>
      </header>
      {currentScreen === "REGISTER" && <Register setAuth={setAuth} />}
      {currentScreen === "SIGNIN" && <SignIn setAuth={setAuth} />}
      {currentScreen === "MOVIES" && <Movies />}
      <CookieBanner/>
    </div>
  );
}

export default App;
