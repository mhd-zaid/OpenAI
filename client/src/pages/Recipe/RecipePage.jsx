import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await apiService.getAll('recipes', `url=${recipeUrl}`);
      setRecipe(res.data[0]);
      console.log("recipe", res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div>
      <h1 className={"font-medium text-4xl"}>{recipe?.title}</h1>
      <span className={"flex gap-4"}>
            <h1>{recipe?.duration}</h1>
            <h1>{recipe?.level}</h1>
            <h1>{recipe?.tags}</h1>
          </span>
      <div className={"grid grid-cols-2 gap-8"}>
        <div>
          <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2"}>Étapes de préparation</p>
          <div className="recipe-instructionContent">
            <ol>
              {recipe?.Quantities && recipe.Quantities.map((ingredient, index) => (
                // <li key={index}>{ingredient.quantity} {ingredient.id}</li>
                <li key={index}>Préchauffez le four à 180°C (th.6) en déposant à l'intérieur un plat à gratin rempli au tiers d'eau.</li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2"}>Ingrédients</p>
          <h1>{recipe?.nb_person}</h1>
          {recipe?.instructions && recipe.instructions.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>

      {recipe?.Comments && recipe.Comments.map((comment, index) => (
        <p key={index}>{comment.text}</p>
      ))}
    </div>
  );
}

export default RecipePage;