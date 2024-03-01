import Navbar from '@/lib/components/Navbar';
import useToken from '../utils/useToken';
const Header = () => {
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken(null);
  };

  return <Navbar basename={''} isLoggedIn={!!token} onLogout={handleLogout} />;
};

export default Header;
