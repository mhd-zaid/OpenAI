import { Link } from "react-router-dom";
import Button from "@/lib/components/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import {useContext, useEffect, useMemo} from 'react';
import {AuthContext} from "@/Context/AuthContext.jsx";

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
        <Button className="flex bg-white" onClick={() => navigate("/auth/login")} variant="rounded">
            <Icon icon="ic:outline-person-outline" style={{fontSize:"20px"}}/>
            <span>Connexion</span>
        </Button>
    </>
);

const Navbar = ({basename, onLogout}) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const navbar = useMemo(() => {
        return isLoggedIn ?
            <AuthenticatedNavbar basename={basename} onLogout={onLogout} /> :
            <UnauthenticatedNavbar basename={basename} navigate={navigate} />
    }, [basename, isLoggedIn, navigate, onLogout]);

    return (
        <nav className="navbar">
            <div className="container mx-auto flex justify-between items-center">
                {navbar}
            </div>
        </nav>
    );
};

export default Navbar;