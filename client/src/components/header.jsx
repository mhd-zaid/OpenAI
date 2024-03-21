import AppNavbar from '@/lib/components/Navbar';
import useToken from '../utils/useToken.js';
const Header = ({menus}) => {
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken(null);
  };

  return <AppNavbar basename={''} onLogout={handleLogout} menus={menus} />;
};

export default Header;
