import React, { useEffect, useState } from 'react';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import IngredientsSelection from '@/components/Profile/IngredientSelection.jsx';
import { Select } from 'chakra-react-select';
import Button from '@/lib/components/Button.jsx';
import { uuidv7 } from 'uuidv7';
import { apiService } from '@/services/apiService.js';

const PreferencesComponent = ({preferences, setPreferences}) => {
  const [ingredients, setIngredients] = useState([]);
  const [favoriteIngredients, setFavoriteIngredients] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  const [allergicIngredients, setAllergicIngredients] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    setFavoriteIngredients(preferences.filter(pref => pref.isLiked === true));
    setDislikedIngredients(preferences.filter(pref => pref.isLiked === false));
    setAllergicIngredients(preferences.filter(pref => pref.isAllergic === true));
  }, [preferences]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchUserPreferences = async () => {
    const getPreferences = await apiService.getUserInfo('users', '/preferences');
    if (getPreferences.data) setPreferences(getPreferences.data);
  }

  const fetchIngredients = async () => {
    const getIngredients = await apiService.getAll('ingredients');
    if (getIngredients.data) setIngredients(getIngredients.data);
  }

  const handleSelectChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions);
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

  const handleCancel = () => {
    setEditingSection(null);
    setSelectedIngredients([]);
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

    const deletedPreferences = oldPreferences.filter(pref => !selectedIngredients.some(ingredient => ingredient.id === pref.Ingredient.id)).map(pref => {
      return {
        id: pref.id,
        IngredientId: pref.Ingredient.id,
        isLiked: editingSection === "like" || editingSection === "dislike" ? null : pref.isLiked,
        isAllergic: editingSection === "allergic" ? null : pref.isAllergic
      }
    })

    try {
      let response = null;
      for (const preference of deletedPreferences) {
        if(preference.isAllergic === null && preference.isLiked === null){
          response = await apiService.deleteById('preferences', preference.id);
          if (!response.success) console.error("Erreur lors de la suppression des préférences:", response.errors);
          else setPreferences(prevPreferences => prevPreferences.filter(pref => !deletedPreferences.some(deletedPref => deletedPref.id === pref.id)));
        } else{
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
        } else {
          response = await apiService.create('preferences', preference);
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
    <SimpleGrid>
      {/*<div className="text-center">*/}
      {/*  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">*/}
      {/*    Gérez vos Préférences Alimentaires*/}
      {/*  </h2>*/}
      {/*  <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">*/}
      {/*    Personnalisez votre expérience culinaire en définissant vos préférences*/}
      {/*    alimentaires sur notre site. Choisissez les ingrédients que vous adorez, ceux que*/}
      {/*    vous n'aimez pas et ceux auxquels vous êtes allergiques pour obtenir des*/}
      {/*    recommandations de recettes adaptées à vos goûts et besoins.*/}
      {/*  </p>*/}
      {/*</div>*/}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {(editingSection === 'like' || editingSection === null) && (
            <div className="mb-6">
              <>
                <Flex alignItems={"center"} gap={2}>
                  <h2 className="text-lg font-semibold">J'aime</h2>
                  {editingSection === null && (
                    <Icon icon="material-symbols:edit-square-outline-rounded"
                          className={"cursor-pointer"}
                          onClick={() => handleSelectList('like')} />)}
                </Flex>
                <IngredientsSelection preferences={favoriteIngredients}
                                      ingredients={ingredients} />
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
                          onClick={() => handleSelectList('dislike')} />)}
                </Flex>
                <IngredientsSelection preferences={dislikedIngredients}
                                      ingredients={ingredients} />
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
                          onClick={() => handleSelectList("allergic")} />)}
                </Flex>
                <IngredientsSelection preferences={allergicIngredients}
                                      ingredients={ingredients} />
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
    </SimpleGrid>
  );
};

export default PreferencesComponent;