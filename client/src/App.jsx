import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import '@/App.css';
import { AuthProvider } from '@/Context/AuthContext.jsx';
import {Container, Wrap} from "@chakra-ui/react";
import SearchComponent from "@/components/SearchComponent.jsx";


const menus = [
  {
    title: 'Recettes par catégories',
    subMenus: [
      { title: 'Toutes les recettes', url: '/recettes' },
      { title: 'Entrées', url: '/recettes/entrees' },
      { title: 'Plats', url: '/recettes/plats' },
      { title: 'Desserts', url: '/recettes/desserts' },
      { title: 'Boissons', url: '/recettes/boissons' },
    ],
  },
  {
    title: 'Mon atelier',
    subMenus: [
      { title: 'Mes Recettes Favorites', url: '/profile#favorites' },
      { title: 'Mes Commentaires', url: '/profile#comments' },
      { title: 'Mes Préférences', url: '/profile#preferences' },
    ],
  },
  { title: 'Contact', url: '/contact' },
  { title: 'A propos', url: '/about' },
];

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Header menus={menus} />
        <div className="flex-grow card max-w-screen-xl self-center my-10 md:my-36 pt-20">
          <Outlet />
        </div>
        {/*<SearchComponent />*/}
        <Footer menus={menus} />
      </div>
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
        theme={"colored"}
        transition:Bounce
      />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;