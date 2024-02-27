import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css';
import App from './App.jsx';
import Home from './pages/HomePage.jsx';
import RecipesPages from './pages/RecipesPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import { ProtectedRoute } from './layouts/ProtectedRoute.jsx';
import extend_theme from './utils/globals/chakra-theme.js';

const theme = extendTheme(extend_theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="recipes" element={<RecipesPages />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
