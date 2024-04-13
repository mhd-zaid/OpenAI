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
      { title: 'Toutes les recettes', url: '/recettes', icon: 'bi:book'},
      { title: 'Entrées', url: '/recettes/entrees', icon: 'fa-solid:utensils'},
      { title: 'Plats', url: '/recettes/plats', icon: 'ic:outline-restaurant-menu' },
      { title: 'Desserts', url: '/recettes/desserts', icon: 'ic:sharp-cake'},
      { title: 'Boissons', url: '/recettes/boissons', icon: 'fa-solid:glass-whiskey'},
    ],
    requireAuth: false,
  },
  {
    title: 'Mon atelier',
    subMenus: [
      { title: 'Mes Recettes Favorites', url: '/profile#favorites' },
      { title: 'Mes Commentaires', url: '/profile#comments' },
      { title: 'Mes Préférences', url: '/profile#preferences' },
    ],
    requireAuth: true,
  },
  { title: 'Contact', url: '/contact', requireAuth: false },
  { title: 'A propos', url: '/about', requireAuth: false },
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