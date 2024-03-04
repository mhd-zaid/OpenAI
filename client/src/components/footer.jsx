import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer flex justify-center">
            <div className="container">
                <div className="row text-white">
                    <div className="col">
                        <h5>Liens</h5>
                        <ul>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/legal">Informations légales</Link></li>
                            <li><Link to="/privacy">Politique de confidentialité</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Réseaux sociaux</h5>
                        <ul>
                            <li><a href="https://www.facebook.com">Facebook</a></li>
                            <li><a href="https://www.instagram.com">Instagram</a></li>
                            <li><a href="https://www.twitter.com">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;