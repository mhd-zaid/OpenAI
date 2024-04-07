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

const ProfilePage = () => {
    const { token } = useToken();
    const [user, setUser] = useState(null);

    const [favorites, setFavorites] = useState([]);
    const [comments, setComments] = useState([]);
    const [nbComments, setNbComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [ingredients, setIngredients] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [favoriteIngredients, setFavoriteIngredients] = useState([]);
    const [dislikedIngredients, setDislikedIngredients] = useState([]);
    const [allergicIngredients, setAllergicIngredients] = useState([]);
    const [editingSection, setEditingSection] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const fetchUserData = async () => {
        try {
            const getUser = await apiService.getUserInfo('users', 'profile');
            if (getUser.data && getUser.data[0]) setUser(getUser.data[0]);

            const getComments = await apiService.getUserInfo('users', '/comments');
            if (getComments.data) {
                setNbComments(getComments.data.length);
                setComments(getComments.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            }

            const getFavorites = await apiService.getUserInfo('users', '/favorites');
            if (getFavorites.data) setFavorites(getFavorites.data);

            const getPreferences = await apiService.getUserInfo('users', '/preferences');
            if (getPreferences.data) setPreferences(getPreferences.data);

            const getIngredients = await apiService.getAll('ingredients');
            if (getIngredients.data) setIngredients(getIngredients.data);

        } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
        }
    };

    const fetchUserPreferences = async () => {
        const getPreferences = await apiService.getUserInfo('users', '/preferences');
        if (getPreferences.data) setPreferences(getPreferences.data);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        setFavoriteIngredients(preferences.filter(pref => pref.isLiked === true));
        setDislikedIngredients(preferences.filter(pref => pref.isLiked === false));
        setAllergicIngredients(preferences.filter(pref => pref.isAllergic === true));
    }, [preferences]);

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

    const handleSelectChange = (selectedOptions) => {
        setSelectedIngredients(selectedOptions);
    }

    const handleDeletePreference = async (preferenceId) => {
        try {
            const response = await apiService.delete('preferences', preferenceId);
            if (response.success) {
                setPreferences(prevPreferences => prevPreferences.filter(preference => preference.id !== preferenceId));
            } else {
                console.error("Erreur lors de la suppression de la préférence:", response.errors);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la préférence:", error);
        }
    }

    const handleCancel = () => {
        setEditingSection(null);
        setSelectedIngredients([]);
    }

    const handleSelectList = (section) => {
        setEditingSection(section);
        let selectedOptions = [];
        if(section === "like") {
            selectedOptions = preferences.filter(pref => pref.isLiked === true).map(pref => pref.Ingredient);
            setSelectedIngredients(selectedOptions);
        } else if(section === "dislike") {
            selectedOptions = preferences.filter(pref => pref.isLiked === false).map(pref => pref.Ingredient);
            setSelectedIngredients(selectedOptions);
        } else if(section === "allergic") {
            selectedOptions = preferences.filter(pref => pref.isAllergic === true).map(pref => pref.Ingredient);
            setSelectedIngredients(selectedOptions);
        }
    }

    const handleSave = async () => {
        const newPreferences = selectedIngredients.map(ingredient => {
            const existingPreference = preferences.find(pref => pref.Ingredient.id === ingredient.id);
            if (editingSection === "like" || editingSection === "dislike") {
                return {
                    id: existingPreference ? existingPreference.id : uuidv7(),
                    IngredientId: ingredient.id,
                    isLiked: editingSection === "like",
                    isAllergic: existingPreference ? existingPreference.isAllergic : null,
                }
            } else if (editingSection === "allergic") {
                return {
                    id: existingPreference ? existingPreference.id : uuidv7(),
                    IngredientId: ingredient.id,
                    isAllergic: true,
                    isLiked: existingPreference ? existingPreference.isLiked : null,
                }
            }
        });

        let oldPreferences = [];
        if (editingSection === "like") oldPreferences = preferences.filter(pref => pref.isLiked === true);
        else if (editingSection === "dislike") oldPreferences = preferences.filter(pref => pref.isLiked === false);
        else if (editingSection === "allergic") oldPreferences = preferences.filter(pref => pref.isAllergic === true);

        //verifie si des preferences ont été supprimées
        const deletedPreferences = oldPreferences.filter(pref => !selectedIngredients.some(ingredient => ingredient.id === pref.Ingredient.id)).map(pref => {
            return {
                id: pref.id,
                IngredientId: pref.Ingredient.id,
                isLiked: editingSection === "like" || editingSection === "dislike" ? null : pref.isLiked,
                isAllergic: editingSection === "allergic" ? null : pref.isAllergic
            }
        })
        if(deletedPreferences.length > 0) console.log("DELETED PREFERENCES : ", deletedPreferences);


        try {
            let response = null;
            for (const preference of deletedPreferences) {
                console.log("preference courante : ", preference)
                console.log("preference allergique : ", preference.isAllergic !==  true)
                console.log("preference aimée : ", preference.isLiked !== true)
                console.log("preference aucune : ", preference.isAllergic !==  true && preference.isLiked !== true)
                if(preference.isAllergic === null && preference.isLiked === null){
                    console.log("Suppression de la preference : ", preference.id);
                    response = await apiService.deleteById('preferences', preference.id);
                    if (!response.success) console.error("Erreur lors de la suppression des préférences:", response.errors);
                    else setPreferences(prevPreferences => prevPreferences.filter(pref => !deletedPreferences.some(deletedPref => deletedPref.id === pref.id)));
                } else{
                    console.log("Suppression de la preference dans une categorie : ", preference.id);
                    newPreferences.push(preference);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la suppression des préférences:", error);
        }

        try {
            let response = null;
            for (const preference of newPreferences) {
                const existingPreference = preferences.find(pref => pref.Ingredient.id === preference.IngredientId);
                if (existingPreference && existingPreference !== preference) {
                    response = await apiService.update('preferences', existingPreference.id, preference);
                    console.log("Mise a jour de la preference : ", existingPreference.id, preference, response);
                } else {
                    response = await apiService.create('preferences', preference);
                    console.log("Creation de la preference : ", preference, response);
                }
                if (!response.success) console.error("Erreur lors de la sauvegarde des préférences:", response.errors);
            }
            if (response.success) {
                setPreferences(prevPreferences => {
                    return prevPreferences.map(pref => {
                        const newPref = newPreferences.find(newPref => newPref.IngredientId === pref.IngredientId);
                        if (newPref) {
                            return {
                                ...pref,
                                isLiked: newPref.isLiked,
                                isAllergic: newPref.isAllergic
                            }
                        } else {
                            return pref;
                        }
                    });
                });
                setEditingSection(null);
                fetchUserPreferences();
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des préférences:", error);
        }
    }

    return (
      <WrapItem flexDirection={"column"}>
          <Flex>
              <Heading as="h1" size="xl">Profil de {user?.username}</Heading>
          </Flex>
          <Tabs>
              <TabList>
                  <Tab>Mes recettes favorites</Tab>
                  <Tab>Mes commentaires</Tab>
                  <Tab>Mes préférences alimentaires</Tab>
              </TabList>

              <TabPanels>
                  <TabPanel>
                      <SimpleGrid columns={3} spacing={5}>
                          {favorites.map((favorite) => (
                            <Link key={favorite.id} to={`/recettes/${favorite.Recipe.url}`}>
                                <Card data-type='Card' h={"full"}>
                                    <Img data-type='Image' objectFit='cover' src={`/img/recipe/${favorite.Recipe.image}`} />
                                    <CardFooter data-type='CardFooter' justify='space-between' flexWrap='wrap'>
                                        <Flex direction={"column"} w={"full"} justifyContent={"space-between"} bgColor={"white"}>
                                            <Text fontFamily={"sans-serif"} fontWeight={700}>{favorite.Recipe.title}</Text>
                                            <Flex justifyContent={"space-between"} w={"full"}>
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
                                  <div className="grid grid-cols-3 gap-8">

                                      {(editingSection === 'like' || editingSection === null) && (
                                        <div className="mb-6">
                                            <>
                                                <Flex alignItems={"center"} gap={2}>
                                                    <h2 className="text-lg font-semibold">J'aime</h2>
                                                    {editingSection === null && (
                                                      <Icon icon="material-symbols:edit-square-outline-rounded"
                                                            className={"cursor-pointer"}
                                                            onClick={() => handleSelectList('like')}/>)}
                                                </Flex>
                                                <IngredientsSelection preferences={favoriteIngredients}
                                                                      ingredients={ingredients}/>
                                            </>
                                        </div>
                                      )}

                                      {(editingSection === 'dislike' || editingSection === null) && (
                                        <div className="mb-6">
                                            <>
                                                <Flex alignItems={"center"} gap={2}>
                                                    <h2 className="text-lg font-semibold">Je n'aime pas</h2>
                                                    {editingSection === null && (
                                                      <Icon icon="material-symbols:edit-square-outline-rounded"
                                                            className={"cursor-pointer"}
                                                            onClick={() => handleSelectList('dislike')}/>)}
                                                </Flex>
                                                <IngredientsSelection preferences={dislikedIngredients}
                                                                      ingredients={ingredients}/>
                                            </>
                                        </div>
                                      )}

                                      {(editingSection === 'allergic' || editingSection === null) && (
                                        <div className="mb-6">
                                            <>
                                                <Flex alignItems={"center"} gap={2}>
                                                    <h2 className="text-lg font-semibold">Je suis allergique à ...</h2>
                                                    {editingSection === null && (
                                                      <Icon icon="material-symbols:edit-square-outline-rounded"
                                                            className={"cursor-pointer"}
                                                            onClick={() => handleSelectList("allergic")}/>)}
                                                </Flex>
                                                <IngredientsSelection preferences={allergicIngredients}
                                                                      ingredients={ingredients}/>
                                            </>
                                        </div>
                                      )}
                                      {selectedIngredients && editingSection != null && (
                                        <>
                                            <div className={"col-span-2"}>
                                                <Select
                                                  isMulti
                                                  variant="flushed"
                                                  colorScheme="orange"
                                                  menuPlacement={"auto"}
                                                  selectedOptionStyle="check"
                                                  placeholder={"Sélectionnez les ingrédients..."}
                                                  hideSelectedOptions={false}
                                                  onChange={handleSelectChange}
                                                  value={selectedIngredients}
                                                  getOptionLabel={(option) => option.name}
                                                  getOptionValue={(option) => option.id}
                                                  options={ingredients} />
                                            </div>
                                            <Button onClick={handleSave}> Sauvegarder </Button>
                                            <Button onClick={handleCancel}> Annuler </Button>
                                        </>
                                      )}

                                  </div>
                              </div>
                          </div>
                      </div>
                  </TabPanel>
              </TabPanels>
          </Tabs>
      </WrapItem>
    );
};

export default ProfilePage;
