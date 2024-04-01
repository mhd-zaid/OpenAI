import useToken from '@/utils/useToken.js';
import React, { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import {
    Avatar, Box,
    Button,
    Card, CardBody, CardFooter,
    CardHeader,
    Container,
    Flex,
    Heading, Img,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Text
} from "@chakra-ui/react";
import CommentComponent from "@/components/Recipe/CommentComponent.jsx";
import Pagination from "@/components/Pagination.jsx";
import {Link} from "react-router-dom";
import {Rating, ThemeProvider} from "@mui/material";
import ratingTheme from "@/theme/ratingTheme.js";
import IngredientsSelection from "@/components/Profile/IngredientSelection.jsx";

const ProfilePage = () => {
    const { token } = useToken();
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [ nbComments, setNbComments ] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [favoriteIngredients, setFavoriteIngredients] = useState(["Tomate", "Pomme de terre", "Oignon"]);
    const [dislikedIngredients, setDislikedIngredients] = useState(["Chou-fleur", "Brocoli", "Chou de Bruxelles"]);
    const [allergicIngredients, setAllergicIngredients] = useState(["Cacahuète", "Noix", "Crustacés"]);
    const ingredientsList = ["Tomate", "Pomme de terre", "Oignon", "Chou-fleur", "Brocoli", "Chou de Bruxelles", "Cacahuète", "Noix", "Crustacés",
        "Lait", "Oeuf", "Blé", "Soja", "Arachide", "Fruits à coque", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques",
        "Poisson", "Céleri", "Gluten", "Lait de vache", "Noisette", "Pistache", "Amande", "Noix de cajou", "Noix de pécan", "Noix du Brésil"];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const getUser = await apiService.getUserInfo('users', `profile`);
                if (getUser.data && getUser.data[0]) setUser(getUser.data[0]);

                const getComments = await apiService.getUserInfo('users', `/comments`);
                if (getComments.data) {
                    setNbComments(getComments.data.length);
                    setComments(getComments?.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
                }

                const getFavorites = await apiService.getUserInfo('users', `favorites`);
                if (getFavorites.data) setFavorites(getFavorites?.data);

                const getPreferences = await apiService.getUserInfo('users', `preferences`);
                if (getPreferences.data) setPreferences(getPreferences?.data);

            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
            }
        };

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
      <>
          <Flex>
              <Heading as="h1" size="xl">Profil de {user?.username}</Heading>

          </Flex>
          <Tabs width={1000}>
              <TabList>
                  <Tab>Mes recettes favorites</Tab>
                  <Tab>Mes commentaires</Tab>
                  <Tab>Mes préférences alimentaires</Tab>
              </TabList>

              <TabPanels>
                  <TabPanel>
                      <SimpleGrid columns={3} spacing={5}>
                          {favorites.map((favorite) => (
                            <Link to={`/recettes/${favorite.Recipe.url}`}>
                                <Card data-type='Card'>
                                    <Img data-type='Image' objectFit='cover' src={`/img/recipe/${favorite.Recipe.image}`} />
                                    <CardFooter data-type='CardFooter' justify='space-between' flexWrap='wrap'>
                                        <Flex direction={"column"} w={"full"} bgColor={"white"}>
                                            <Text fontFamily={"sans-serif"} fontWeight={700}>{favorite.Recipe.title}</Text>
                                            <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                                                <ThemeProvider theme={ratingTheme}>
                                                    <Rating name="half-rating" value={favorite.Recipe.average_rating} precision={0.5} readOnly={true}/>
                                                </ThemeProvider>
                                                <Text fontSize={"smaller"} color={"gray.400"}>31/03/2024</Text>
                                            </Flex>
                                        </Flex>
                                    </CardFooter>
                                </Card>
                            </Link>
                          ))}
                      </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                      <div className="my-4">
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
                  <TabPanel>
                      <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-7xl mx-auto">
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
                              <div className="mt-12">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                      {/* Section des ingrédients préférés */}
                                      <div className="mb-6">
                                          <h2 className="text-lg font-semibold mb-2">Ingrédients préférés</h2>
                                          <IngredientsSelection
                                            ingredients={favoriteIngredients}
                                          />
                                      </div>

                                      {/* Section des ingrédients non appréciés */}
                                      <div className="mb-6">
                                          <h2 className="text-lg font-semibold mb-2">Ingrédients non appréciés</h2>
                                          <IngredientsSelection
                                            ingredients={dislikedIngredients}
                                          />
                                      </div>

                                      {/* Section des ingrédients allergiques */}
                                      <div>
                                          <h2 className="text-lg font-semibold mb-2">Ingrédients allergiques</h2>
                                          <IngredientsSelection
                                            ingredients={allergicIngredients}
                                          />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </TabPanel>
              </TabPanels>
          </Tabs>
      </>
    )
      ;
};

export default ProfilePage;
