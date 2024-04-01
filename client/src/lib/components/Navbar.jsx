import { Link } from 'react-router-dom';
import Button from '@/lib/components/Button';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '@/Context/AuthContext.jsx';
import Searchbar from '../../components/searchbar';
import {Circle} from "@chakra-ui/react";
const Navbar = ({ basename, onLogout, menus }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState([]);

    const toggleMenu = menuIndex => {
        if (openMenus.includes(menuIndex)) {
            setOpenMenus([]);
        } else {
            setOpenMenus([menuIndex]);
        }
    };


    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isMenuOpen && !e.target.closest("#main-menu") && !e.target.closest("button")) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
      <>
          <div className="grid grid-cols-12 p-2 bg-white z-20 fixed w-full shadow-xl">
              {/* Menu items */}
              <div className="col-span-1 flex justify-center items-center">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400"
                  >
                      <svg
                        className="fill-yellow-400 h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                          <title>Menu</title>
                          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                      </svg>
                  </button>
              </div>

              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="lg:col-span-2 md:col-span-4 col-span-10 flex items-center justify-center flex-shrink-0 gap-2 effect-grew"
              >
                  <Icon icon="noto:man-cook-dark-skin-tone" fontSize={30} />
                  <span className="font-semibold text-lg tracking-tight bg-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 inline-block text-transparent bg-clip-text">
                        Cuisine Connect
                    </span>
              </button>

              {/* Search bar */}
              <Searchbar />

            {!isLoggedIn ? (
              <div
                className={'col-span-2 justify-center items-center hidden lg:flex'}
              >
                <Button
                  className="flex btn bezel"
                  onClick={() => navigate('/auth/login')}
                  variant="rounded"
                >
                  <Icon
                    icon="ic:outline-person-outline"
                    style={{ fontSize: '20px' }}
                  />
                  <span>Connexion</span>
                </Button>
              </div>
            ) : (
              <div
                className={'col-span-2 justify-center items-center hidden lg:flex'}
              >
                <div className={'col-span-2 justify-center items-center hidden lg:flex gap-4'}>
                  <Button className="flex btn bezel" onClick={() => navigate("/profile")} variant="rounded">
                    <span>Mon profil</span>
                  </Button>
                  <Button className={"btn bezel"} variant={"icon"} onClick={onLogout}>
                    <Icon icon={"uil:signout"} style={{fontSize: "20px", color: "white"}} />
                  </Button>
                </div>
              </div>
            )}

              <div className={'flex cursor-pointer md:hidden'}>
                  <div className="lg:col-span-7 md:col-span-6 hidden md:block">
                      <form>
                          <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                  <Icon icon="line-md:search" fontSize={20} style={{color: "#facc15"}} />
                              </div>
                              <input type="search" id="default-search"
                                     className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                     placeholder="Une recette, un ingrédient, de l'aide..." required />
                          </div>
                      </form>
                  </div>
                  <div className={"flex cursor-pointer md:hidden"}>
                      <button>
                          <Icon
                            icon="line-md:search"
                            fontSize={20}
                            style={{ color: '#facc15' }}
                          />
                      </button>
                  </div>
                  {/* Connexion */}
                  {!isLoggedIn ? (
                    <div
                      className={'col-span-2 justify-center items-center hidden lg:flex'}
                    >
                        <Button
                          className="flex btn bezel"
                          onClick={() => navigate('/auth/login')}
                          variant="rounded"
                        >
                            <Icon
                              icon="ic:outline-person-outline"
                              style={{ fontSize: '20px' }}
                            />
                            <span>Connexion</span>
                        </Button>
                    </div>
                  ) : (
                    <div
                      className={'col-span-2 justify-center items-center hidden lg:flex'}
                    >
                        <span>Mes recettes</span>
                        <div className={'col-span-2 justify-center items-center hidden lg:flex'}>
                            <Button className="flex btn bezel" onClick={() => navigate("/profile")} variant="rounded">
                                <span>Mon profil</span>
                            </Button>
                        </div>
                    </div>
                  )}
                  <div id={"main-menu"} className={`absolute top-12 bg-white w-full md:w-3/12 h-screen flex-grow px-4 ${isMenuOpen ? 'open' : ''}`}>
                      <div className="grid grid-cols-12 grid-rows-12 text-sm lg:flex-grow text-black h-full">
                          {!isLoggedIn ? (
                            <>
                                <div className="col-span-6 flex justify-center items-center">
                                    <Button
                                      className="flex btn bezel"
                                      onClick={() => {
                                          navigate('/auth/login');
                                          setIsMenuOpen(false);
                                      }}
                                      variant="rounded"
                                    >
                                        <Icon
                                          icon="ic:outline-person-outline"
                                          style={{ fontSize: '20px' }}
                                        />
                                        <span>Connexion</span>
                                    </Button>
                                </div>
                                <div className="col-span-6 flex justify-center items-center text-lg underline text-yellow-500">
                                    <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                                        Inscription
                                    </Link>
                                </div>
                            </>
                          ) : (
                            <div className="col-span-12 flex justify-center items-center">
                                <Button
                                  className="flex btn bezel"
                                  onClick={onLogout}
                                  variant="rounded"
                                >
                                    <Icon
                                      icon="ic:outline-person-outline"
                                      style={{ fontSize: '20px' }}
                                    />
                                    <span>Déconnexion</span>
                                </Button>
                            </div>
                          )}
                          <div className="col-span-12">
            <span>
              Découvrez des recettes personnalisées en créant votre profil
              Cuisine Connect
            </span>
                          </div>

                          <div className={'col-span-12'}>
                              {Array.from(menus).map((menu, menuIndex) => (
                                <div key={menuIndex} className="mb-2">
                                    <div key={menuIndex} className="col-span-12 grid h-10">
                                        {menu.subMenus ? (
                                          <span
                                            className="main-menu-items w-full mb-2"
                                            onClick={() => toggleMenu(menuIndex)}
                                          >
                      {menu.title}
                                              <Icon
                                                icon="bi:chevron-down"
                                                style={{
                                                    color: openMenus.includes(menuIndex)
                                                      ? 'gray'
                                                      : 'black',
                                                    transform: openMenus.includes(menuIndex)
                                                      ? 'rotate(0deg)'
                                                      : 'rotate(-90deg)',
                                                }}
                                              />
                    </span>
                                        ) : (
                                          <Link to={menu.url} className="main-menu-items">
                                              {menu.title}
                                              <Icon
                                                icon="bi:chevron-right"
                                                style={{ color: 'black' }}
                                              />
                                          </Link>
                                        )}
                                    </div>

                                    <div
                                      className={`ml-4 transition-max-height ease-in-out duration-300 ${
                                        openMenus.includes(menuIndex) ? 'max-h-48' : 'max-h-0'
                                      } overflow-hidden`}
                                    >
                                        <ul className={'col gap-2'}>
                                            {menu.subMenus &&
                                              menu.subMenus.map((subMenu, index) => (
                                                <li key={index} className={'text-lg'}>
                                                    <Link to={subMenu.url}>{subMenu.title}</Link>
                                                </li>
                                              ))}
                                        </ul>
                                    </div>
                                </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
};

export default Navbar;
