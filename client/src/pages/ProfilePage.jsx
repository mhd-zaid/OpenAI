import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, WrapItem,
} from '@chakra-ui/react';
import Pagination from '@/components/Pagination.jsx';
import {useLocation} from 'react-router-dom';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import FavoriteComponent from '@/components/Profile/FavoriteComponent.jsx';
import PreferencesComponent from '@/components/Profile/PreferencesComponent.jsx';

const ProfilePage = () => {
    const [comments, setComments] = useState([]);
    const [nbComments, setNbComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [preferences, setPreferences] = useState([]);
    const location = useLocation();
    const anchorId = location.hash.substring(1);

    const tabIndices = {
        'favorites': 0,
        'comments': 1,
        'preferences': 2,
    };

    const tabIndex = tabIndices[anchorId] || 0;

    const fetchUserData = async () => {
        try {
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
          <Tabs isFitted defaultIndex={tabIndex}>

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
                  <Tab id="favorites" fontSize={['xs', 'sm', null, 'lg']}>Mes recettes favorites</Tab>
                  <Tab id="comments" fontSize={['xs', 'sm', null, 'lg']}>Mes commentaires</Tab>
                  <Tab id="preferences" fontSize={['xs', 'sm', null, 'lg']}>Mes préférences alimentaires</Tab>
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
