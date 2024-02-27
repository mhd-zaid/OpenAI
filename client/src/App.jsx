import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Chatbot />
    </>
  );
};

export default App;
