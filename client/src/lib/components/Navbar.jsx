import { Link } from "react-router-dom";
import Button from "@/lib/components/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useMemo } from 'react';

const AuthenticatedNavbar = ({ basename, onLogout }) => (
  <>
    <div className="space-x-4 flex text-center justify-center align-middle">
      <Link to={basename} className="text-white">Accueil</Link>
      <Link to={`${basename}/about`} className="text-white">A propos</Link>
    </div>
    <Button className="flex" onClick={onLogout} variant="icon">
      <Icon icon="ic:baseline-logout" style={{fontSize:"20px", paddingLeft:"4px"}} />
      <span>Déconnexion</span>
    </Button>
  </>
);

const UnauthenticatedNavbar = ({ basename, navigate }) => (
  <>
    <div className="space-x-4 flex text-center justify-center align-middle">
      <Link to={basename} className="text-white">Accueil</Link>
    </div>
    <Button className="flex" onClick={() => navigate("/auth/login")} variant="rounded">
      <Icon icon="ic:outline-person-outline" style={{fontSize:"20px"}}/>
      <span>Connexion</span>
    </Button>
  </>
);

const Navbar = ({basename, isLoggedIn, onLogout}) => {
  const navigate = useNavigate();
  const navbar = useMemo(() => {
    return isLoggedIn ?
      <AuthenticatedNavbar basename={basename} onLogout={onLogout} /> :
      <UnauthenticatedNavbar basename={basename} navigate={navigate} />
  }, [isLoggedIn, basename, onLogout, navigate]);

  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        {navbar}
      </div>
    </nav>
  );
};

export default Navbar;