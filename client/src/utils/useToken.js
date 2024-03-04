import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext.jsx';

export default function useToken() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return JSON.parse(tokenString);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken === null) {
      localStorage.removeItem('token');
      setToken(userToken);
      setIsLoggedIn(false);
      return;
    }
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token, setIsLoggedIn]);

  return {
    token,
    setToken: saveToken,
  };
}