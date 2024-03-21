import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css';
import App from './App.jsx';
import Home from './pages/HomePage.jsx';
import Profile from './pages/ProfilePage.jsx';
import { ProtectedRoute } from './layouts/ProtectedRoute.jsx';
import extend_theme from './utils/globals/chakra-theme.js';
import LoginComponent from '@/components/Authentication/LoginComponent';
import RegisterComponent from '@/components/Authentication/RegisterComponent';
import ForgetPasswordComponent from '@/components/Authentication/ForgetPasswordComponent';
import ResetPasswordComponent from '@/components/Authentication/ResetPasswordComponent';
import DashboardPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import EmailVerifiedPage from '@/pages/EmailVerifiedPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';

const theme = extendTheme(extend_theme);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="about" element={<AboutPage />} />
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="auth">
              <Route path="login" element={<LoginComponent />} />
              <Route path="register" element={<RegisterComponent />} />
              <Route
                path="forgetpassword"
                element={<ForgetPasswordComponent />}
              />
              <Route
                path="resetpassword/:token"
                element={<ResetPasswordComponent />}
              />
              <Route path="verify" element={<EmailVerifiedPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
