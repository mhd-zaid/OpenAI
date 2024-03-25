import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Chatbot from './components/chatbot';
import { ToastContainer } from 'react-toastify';
import '@/App.css';
import { AuthProvider } from '@/Context/AuthContext.jsx';

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
        <main className="flex-grow card max-w-screen-md self-center md:my-4 md:mx-4">
          <Outlet />
        </main>
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
        theme="colored"
        transition:Bounce
      />
    </AuthProvider>
  );
};

export default App;