import React, { useState } from 'react';

const IngredientsSelection = ({ ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Fonction pour gérer la sélection d'un ingrédient
  const handleIngredientToggle = (ingredientId) => {
    setSelectedIngredients((prevSelected) => {
      // Vérifie si l'ingrédient est déjà sélectionné
      const isAlreadySelected = prevSelected.some((item) => item.IngredientId === ingredientId);

      // Si l'ingrédient est déjà sélectionné, le retire de la liste
      if (isAlreadySelected) {
        return prevSelected.filter((item) => item.IngredientId !== ingredientId);
      } else {
        // Sinon, l'ajoute à la liste avec des valeurs par défaut
        return [...prevSelected, { IngredientId: ingredientId, isLiked: true, isAllergic: false }];
      }
    });
  };

  return (
    <div>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center mb-2">
          {/* Checkbox pour la sélection de l'ingrédient */}
          <input
            type="checkbox"
            checked={selectedIngredients.some((item) => item.IngredientId === ingredient.id)}
            onChange={() => handleIngredientToggle(ingredient.id)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          {/* Nom de l'ingrédient */}
          <span className="ml-2">{ingredient.name}</span>
        </div>
      ))}
    </div>
  );
};

export default IngredientsSelection;
