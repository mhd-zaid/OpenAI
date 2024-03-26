import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import { useParams } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage.jsx';
import Button from '@/lib/components/Button.jsx';
import SocialBar from '@/components/SocialBar.jsx';
import CommentsPage from '@/pages/CommentsPage.jsx';

import { Icon } from '@iconify/react';
import CommentForm from '@/components/Recipe/CommentForm.jsx';
import CardComponent from '@/lib/components/CardComponent.jsx';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import useToken from '@/utils/useToken.js';

const RecipePage = () => {
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nbPerson, setNbPerson] = useState(1);
  const [recommandedRecipes, setRecommandedRecipes] = useState([]);
  const { token } = useToken();

  const fetchRecipe = async () => {
    try {
      const res = await apiService.getAll('recipes', `url=${recipeUrl}`);
      if (res.data.length > 0) {
        setRecipe(res.data[0]);
        setNbPerson(res.data[0].nb_person);
        fetchRecommandedRecipes(res.data[0].id);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommandedRecipes = async (recipeId) => {
    setLoading(true)
    try {
      const res = await apiService.getAll('recommendation', `/${recipeId}`);
      if (!res.error) {
        const recommendations = JSON.parse(res.content);
        setRecommandedRecipes(recommendations);
        console.log("recommendations", recommendations);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const user = apiService.getAll('users', `token=${token}`);
      const favorite = apiService.getAll('favorites', `RecipeId=${recipe.id}&UserId=${user[0].id}`);
      return favorite.length > 0;
    } catch (err) {
      console.error(err);
    }
  }

  const addToFavorites = async () => {
    try {

      const user = apiService.getAll('users', `token=${token}`);

      await apiService.create('favorites', {
        RecipeId: recipe.id,
        UserId: user[0].id,
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, []);


  const handleAddPerson = () => {
    setNbPerson(prevNbPerson => prevNbPerson + 1);
  };

  const handleRemovePerson = () => {
    if (nbPerson > 1) {
      setNbPerson(prevNbPerson => prevNbPerson - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1 className={"font-medium text-4xl mb-4"}>{recipe?.title}</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className={"col-span-2"}>

          {/*Information générale sur la recette*/}
          <div className={"grid grid-cols-2 gap-2"}>

            <div className={'col-span-12 flex gap-4 justify-between'}>
              <div className={'flex gap-4'}>
            <span className={'flex items-center gap-1'}>
              <Icon icon="mdi:clock-outline" style={{ color: 'black' }} />
              {recipe?.duration}
            </span>
                <span className={'flex items-center gap-1'}>
              <Icon icon="ic:baseline-stars" style={{ color: 'black' }} />
                  {recipe?.level}
            </span>
                <span className={'flex items-center gap-1 uppercase'}>
              <Icon icon="mdi:tags" style={{ color: 'black' }} />
                  {recipe?.tags}
            </span>
              </div>
              <span className={'flex items-center space-x-2'}>
              <span><span className={'font-bold text-xl'}>{recipe?.average_rating}</span>/5</span>
              <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="w-1 h-1 mx-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{recipe?.nb_rating} notes</a>
          </span>
            </div>

            <div className="recipe-media col-span-12">
              <iframe
                src={'https://placehold.co/1920x1080.mp4'}
                title="Recipe video"
                width="100%"
                height="400"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className={'col-span-12 flex gap-4 mb-4'}>
              <Button className="flex btn bezel items-center gap-2">
                <Icon icon="ic:baseline-favorite" />
                <span>Sauvegarder</span>
              </Button>
              <Button className="flex btn bezel items-center gap-2" onClick={() => window.print()}>
                <Icon icon="ic:round-local-printshop" />
                <span>Imprimer</span>
              </Button>
            </div>

          </div>

          <div className={"grid grid-cols-5 gap-8"}>

            {/*Étapes de préparation*/}
            <div className="recipe-instructionContent col-span-3">
              <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2 mb-4"}>Étapes de préparation</p>
              <div>
                <ol>
                  {recipe?.instructions && recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/*Ingrédients*/}
            <div className="recipe-ingredientsContent col-span-2">
              <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2 mb-4"}>Ingrédients</p>

              {/*Mise à jour du nombre de personnes*/}
              <div className={"flex w-full justify-around mb-8"}>
                <Button onClick={handleRemovePerson}>
                  <Icon icon="ic:sharp-remove-circle" style={{ color: 'black', fontSize: 40, boxShadow: "revert-layer" }} />
                </Button>
                <span className={'m-0 text-xl flex items-center'}>{nbPerson} {nbPerson === 1 ? 'personnes' : 'personnes'}</span>
                <Button onClick={handleAddPerson}>
                  <Icon icon="ic:outline-add-circle" style={{ color: "black", fontSize: 40 }} />
                </Button>
              </div>

              <ul>
                {recipe?.Quantities && recipe.Quantities.map((quantities, index) => (
                  <li key={index} className={"list-none text-lg"}>
                    <span className={"font-medium"}>
                      {quantities.unit
                        ? Math.round(((quantities.quantity / recipe.nb_person) * nbPerson) * 10) / 10
                        : Math.round((quantities.quantity / recipe.nb_person) * nbPerson)}
                      {quantities.unit}
                    </span> {quantities.Ingredient.name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/*Astuces et conseils de la recette*/}
          {recipe?.tips && (
            <CardComponent variant={"withShadow"} boxShadow={{color:"#d69a06", position:"bottomRight"}} className={""}>
              <div className={"flex font-bold text-2xl items-center mb-2"}>
                <Icon icon="flat-color-icons:idea" fontSize={50}/>
                <h2>Astuces et conseils pour {recipe?.title}</h2>
              </div>
              <div>
                <p className={"m-0 px-3 font-light text-lg"}>{recipe?.tips}</p>
              </div>
            </CardComponent>
          )}

          <div className="my-8">
            <SocialBar />
          </div>

          <div className="my-4">
            <CommentForm recipeId={recipe?.id} />
          </div>

          <div className={"my-4"}>
            <CommentComponent comments={recipe?.Comments} recipeUrl={recipe?.url} limit={3} />
          </div>
        </div>

        {/*Recettes suggérées*/}
        <div className={"col"}>
          <h1 className={"text-xl font-medium mb-4"}>Recettes suggérées</h1>

          <div className="col gap-4">
            {recommandedRecipes.length > 0 ? (
              recommandedRecipes.map((recommandedRecipe, index) => (
                <div key={index} className={"row gap-4"}>
                  <img src="http://placehold.it/70x70" alt="Recipe image" />
                  <div className={"col justify-between"}>
                    <span className={"font-medium text-xl flex-wrap"}>{recommandedRecipe.title}</span>
                    <div className="row justify-between">
                      <ThemeProvider theme={ratingTheme}>
                        <Rating name="half-rating" value={recommandedRecipe.average_rating} precision={0.5}
                                readOnly={true} />
                      </ThemeProvider>
                      <small>({recommandedRecipe.nb_rating} notes)</small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={"row gap-4"}>
                <img src="http://placehold.it/70x70" alt="Recipe image" />
                <div className={"col justify-between"}>
                  <span className={"font-medium text-xl flex-wrap"}>Gateau de semoule aux noisettes</span>
                  <div className="row justify-between">
                    <ThemeProvider theme={ratingTheme}>
                      <Rating name="half-rating" value={recipe?.average_rating} precision={0.5} readOnly={true} />
                    </ThemeProvider>
                    <small>(104 notes)</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecipePage;
