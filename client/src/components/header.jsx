import Navbar from '@/lib/components/Navbar';
import useToken from '../utils/useToken.js';
const Header = () => {
  const { token, setToken } = useToken();

  const handleLogout = () => {
    setToken(null);
  };

  return <Navbar basename={''} onLogout={handleLogout} />;
};

export default Header;
