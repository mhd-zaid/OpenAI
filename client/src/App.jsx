import { useState } from "react";
import { faker } from "@faker-js/faker";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/App.css";
import useToken from "./utils/useToken.js";

import LoginComponent from "@/components/Authentication/LoginComponent";
import RegisterComponent from "@/components/Authentication/RegisterComponent";
import ForgetPasswordComponent from "@/components/Authentication/ForgetPasswordComponent";
import ResetPasswordComponent from "@/components/Authentication/ResetPasswordComponent";
import DashboardPage from "@/pages/DashboardPage";
import AboutPage from "@/pages/AboutPage";
import Navbar from "@/lib/components/Navbar";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import EmailVerifiedPage from "@/pages/EmailVerifiedPage.jsx";

const defaultTheme = {
  mode: "light",
  light: {
    h1: {
      backgroundColor: faker.color.human(),
      color: "red",
      border: "5px solid green",
    },
    button: {
      backgroundColor: faker.color.human(),
      color: faker.color.human(),
    },
  },
  dark: {
    h1: {
      backgroundColor: faker.color.human(),
      color: faker.color.human(),
      border: "5px solid red",
    },
    button: {
      backgroundColor: faker.color.human(),
      color: faker.color.human(),
    },
  },
};

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken(null);
  };

  // const toggleTheme = () => {
  //   const oldH1Color = theme[theme.mode].h1.color;
  //   const oldButtonColor = theme[theme.mode].button.color;
  //   const oldH1BackgroundColor = theme[theme.mode].h1.backgroundColor;
  //   const oldButtonBackgroundColor = theme[theme.mode].button.backgroundColor;
  //
  //   const newTheme = {
  //     ...theme,
  //     [theme.mode]: {
  //       ...theme[theme.mode],
  //       h1: {
  //         ...theme[theme.mode].h1,
  //         color: oldH1BackgroundColor,
  //         backgroundColor: oldH1Color,
  //       },
  //       button: {
  //         ...theme[theme.mode].button,
  //         color: oldButtonBackgroundColor,
  //         backgroundColor: oldButtonColor,
  //       },
  //     },
  //   };
  //
  //   setTheme(newTheme);
  // };

  const basename = "";

  const AuthenticatedRoutes = () => (
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
  );

  const UnauthenticatedRoutes = () => (
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="auth">
          <Route path="login" element={<LoginComponent setToken={setToken} />} />
          <Route path="register" element={<RegisterComponent setToken={setToken} />} />
          <Route path="forgetpassword" element={<ForgetPasswordComponent />} />
          <Route path="resetpassword/:token" element={<ResetPasswordComponent />} />
          <Route path="verify" element={<EmailVerifiedPage />} />
        </Route>
      </Routes>
  );

  return (
      <Router basename={basename}>
        <Navbar basename={basename} isLoggedIn={!!token} onLogout={handleLogout} theme={theme}/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
            transition: Bounce
        />
        <div className="main-component">
          {token ? <AuthenticatedRoutes/> : <UnauthenticatedRoutes/>}
        </div>
      </Router>
  );

}

export default App;
