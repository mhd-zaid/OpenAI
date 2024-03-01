import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
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
        transition:Bo
        unce
      />
    </>
  );
};

export default App;
