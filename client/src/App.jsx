import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import { ToastContainer } from 'react-toastify';
import {AuthProvider} from "@/Context/AuthContext.jsx";
import "@/App.css";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Header />
                <div className={"min-h-screen"}>
                    <Outlet />
                </div>
                <Footer />
                <Chatbot />
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
                    transition:Bounce
                />
            </AuthProvider>
        </>
    );
};

export default App;