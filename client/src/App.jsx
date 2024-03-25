import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import { ToastContainer } from 'react-toastify';
import {AuthProvider} from "@/Context/AuthContext.jsx";
import "@/App.css";
import { ChakraProvider } from '@chakra-ui/react';


const menus = [
  { title: "Recettes par catégories",
    subMenus: [
      { title: "Entrées", url: "/recipes/entrees" },
      { title: "Plats", url: "/recipes/plats" },
      { title: "Desserts", url: "/recipes/desserts" },
      { title: "Boissons", url: "/recipes/boissons" }]
  },
  { title: "Idées de recettes",
    subMenus: [
      { title: "Recettes de saison", url: "/recipes/seasonal" },
      { title: "Recettes de fêtes", url: "/recipes/holidays" },
      { title: "Recettes du monde", url: "/recipes/world" }]
  },
  // { title: "Aide et astuces",
  //   subMenus: [
  //     { title: "Conseils", url: "/help/tips" },
  //     { title: "Questions fréquentes", url: "/help/faq" },
  //     { title: "Aide en ligne", url: "/help/online" }]
  // },
  { title: "Contact", url: "/contact" },
  { title: "A propos", url: "/about" },
]

const App = () => {
  return (
    <>
      <AuthProvider>
        <ChakraProvider>
          <div className="min-h-screen col justify-between">
            <Header menus={menus} />
            <main className="flex-grow card max-w-screen-lg self-center md:my-32 md:mx-4">
              <Outlet />
            </main>
            <Footer menus={menus} />
          </div>
          <Chatbot />
          <ToastContainer
            position="bottom-right"
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
        </ChakraProvider>
      </AuthProvider>
    </>
  );
};

export default App;