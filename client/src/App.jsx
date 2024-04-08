import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import '@/App.css';
import { AuthProvider } from '@/Context/AuthContext.jsx';
import {Container, Wrap} from "@chakra-ui/react";


const menus = [
  {
    title: 'Recettes par catégories',
    subMenus: [
      { title: 'Entrées', url: '/recipes/entrees' },
      { title: 'Plats', url: '/recipes/plats' },
      { title: 'Desserts', url: '/recipes/desserts' },
      { title: 'Boissons', url: '/recipes/boissons' },
    ],
  },
  {
    title: 'Idées de recettes',
    subMenus: [
      { title: 'Recettes de saison', url: '/recipes/seasonal' },
      { title: 'Recettes de fêtes', url: '/recipes/holidays' },
      { title: 'Recettes du monde', url: '/recipes/world' },
    ],
  },
  // { title: "Aide et astuces",
  //   subMenus: [
  //     { title: "Conseils", url: "/help/tips" },
  //     { title: "Questions fréquentes", url: "/help/faq" },
  //     { title: "Aide en ligne", url: "/help/online" }]
  // },
  { title: 'Contact', url: '/contact' },
  { title: 'A propos', url: '/about' },
];

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Header menus={menus} />
        <div className="flex-grow card max-w-screen-xl self-center my-10 md:my-20 pt-20">
          <Outlet />
        </div>
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