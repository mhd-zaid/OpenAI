import useToken from '@/utils/useToken.js';
import React, { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import {
    Text,
    Card, CardFooter,
    Flex,
    Heading, Img, Radio, RadioGroup, SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, WrapItem,
} from '@chakra-ui/react';
import IngredientsSelection from "@/components/Profile/IngredientSelection.jsx";
import {Icon} from "@iconify/react";
import {Select} from "chakra-react-select";
import Button from "@/lib/components/Button.jsx";
import { uuidv7 } from 'uuidv7';
import Pagination from '@/components/Pagination.jsx';
import { Link } from 'react-router-dom';
import { Rating, ThemeProvider } from '@mui/material';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import ratingTheme from '@/theme/ratingTheme.js';
import FavoriteComponent from '@/components/Profile/FavoriteComponent.jsx';
import PreferencesComponent from '@/components/Profile/PreferencesComponent.jsx';

const ProfilePage = () => {
    const { token } = useToken();
    const [user, setUser] = useState(null);

    const [comments, setComments] = useState([]);
    const [nbComments, setNbComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [preferences, setPreferences] = useState([]);

    const fetchUserData = async () => {
        try {
            const getUser = await apiService.getUserInfo('users', 'profile');
            if (getUser.data && getUser.data[0]) setUser(getUser.data[0]);

            const getComments = await apiService.getUserInfo('users', '/comments');
            if (getComments.data) {
                setNbComments(getComments.data.length);
                setComments(getComments.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            }

            const getPreferences = await apiService.getUserInfo('users', '/preferences');
            if (getPreferences.data) setPreferences(getPreferences.data);

        } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserComments = async () => {
            const getComments = await apiService.getUserInfo('users', `/comments`);
            if (getComments.data) {
                setNbComments(getComments.data.length);
                setComments(getComments?.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            }
        }
        fetchUserComments();
    }, [currentPage]);

    return (
      <WrapItem flexDirection={"column"}>
          <Tabs isFitted >

              <TabPanels pt={"4"}>

                  <TabPanel p={[0, null, null]}>
                      <div className="text-center">
                          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                              Mes recettes favorites
                          </h2>
                          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                              Vous pouvez retrouver ici la liste de vos recettes favorites. Découvrez les plats que vous adorez et accédez-y facilement pour les cuisiner à nouveau.
                          </p>
                      </div>
                  </TabPanel>

                  <TabPanel p={[0, null, null]}>
                      <div className="text-center">
                          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                              Mes commentaires
                          </h2>
                          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                              Consultez ici tous vos commentaires laissés sur les recettes. Partagez votre expérience culinaire avec la communauté et découvrez ce que les autres utilisateurs pensent des plats que vous avez essayés.
                          </p>
                      </div>
                  </TabPanel>

                  <TabPanel p={[0, null, null]}>
                      <div className="text-center">
                          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                              Gérez vos Préférences Alimentaires
                          </h2>
                          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                              Personnalisez votre expérience culinaire en définissant vos préférences
                              alimentaires sur notre site. Choisissez les ingrédients que vous adorez, ceux que
                              vous n'aimez pas et ceux auxquels vous êtes allergiques pour obtenir des
                              recommandations de recettes adaptées à vos goûts et besoins.
                          </p>
                      </div>
                  </TabPanel>

              </TabPanels>


              <TabList>
                  <Tab fontSize={['xs', 'sm', null, 'lg']}>Mes recettes favorites</Tab>
                  <Tab fontSize={['xs', 'sm', null, 'lg']}>Mes commentaires</Tab>
                  <Tab fontSize={['xs', 'sm', null, 'lg']}>Mes préférences alimentaires</Tab>
              </TabList>

              <TabPanels pt={"4"}>

                  <TabPanel p={[0, null, null]}>
                      <FavoriteComponent/>
                  </TabPanel>

                  <TabPanel p={[0, null, null]}>
                      <div className="mb-4">
                          <CommentComponent comments={comments}/>
                      </div>
                      <div className={"w-full row justify-end"}>
                          <Pagination
                            totalPages={Math.ceil(nbComments / itemsPerPage)}
                            currentPage={currentPage}
                            onPageChange={(newPage) => {
                                if (newPage >= 1 && newPage <= Math.ceil(nbComments / itemsPerPage)) {
                                    setCurrentPage(newPage);
                                }
                            }}
                          />
                      </div>
                  </TabPanel>

                  <TabPanel p={[0, null, null]}>
                      <PreferencesComponent preferences={preferences} setPreferences={setPreferences}/>
                  </TabPanel>

              </TabPanels>
          </Tabs>
      </WrapItem>
    );
};

export default ProfilePage;
