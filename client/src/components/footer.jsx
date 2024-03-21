import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="flex row justify-center text-white space-x-4">
          <div className="col">
            <Heading fontSize={'xl'} mb={4}>
              Liens
            </Heading>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/legal">Informations légales</Link>
              </li>
              <li>
                <Link to="/privacy">Politique de confidentialité</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <Heading fontSize={'xl'} mb={4}>
              Réseaux sociaux
            </Heading>
            <ul>
              <li>
                <a href="https://www.facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com">Instagram</a>
              </li>
              <li>
                <a href="https://www.twitter.com">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
