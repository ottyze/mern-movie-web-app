import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  const setEmail = (email) => {
    console.log("email_app.js",email)
    setUserEmail(email);
  };

  return (
    <AppContext.Provider value={{ userEmail, setEmail }}>
        {children}
    </AppContext.Provider>
  );
};