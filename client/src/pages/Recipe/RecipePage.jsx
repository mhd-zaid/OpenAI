import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService.js';
import { Link, useParams } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage.jsx';
import Button from '@/lib/components/Button.jsx';
import SocialBar from '@/components/SocialBar.jsx';

import { Icon } from '@iconify/react';
import CommentForm from '@/components/Recipe/CommentForm.jsx';
import CardComponent from '@/lib/components/CardComponent.jsx';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify';
import { Box, Text } from '@chakra-ui/react';

async function submitFavorite(recipeId) {
  try {
    console.log("create", recipeId);
    return await apiService.create('favorites', { RecipeId: recipeId });
  } catch (error) {
    console.error(error);
    return { success: false, errors: error };
  }
}

const RecipePage = () => {
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nbPerson, setNbPerson] = useState(1);
  const [recommandedRecipes, setRecommandedRecipes] = useState([]);
  const [accompaniments, setAccompaniments] = useState([]);

  const getRecipe = async () => {
    try {
      setLoading(true)
      const res = await apiService.getUserInfo('recipes', `${recipeUrl}`);
      if (res.data) {
        setRecipe(res.data);
        setNbPerson(res.data.nb_person)
        getRecommandedRecipes(res.data.id);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const getRecommandedRecipes = async (recipeId) => {
    try {
      const res = await apiService.getAll('recommendation', `/${recipeId}`);
      if (!res.error) {
        const recommendations = JSON.parse(res.content);
        setRecommandedRecipes(recommendations);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const checkIfFavorite = async () => {
  //   try {
  //     const favorite = apiService.getAll('favorites', `RecipeId=${recipe.id}&UserId=${user[0].id}`);
  //     return favorite.length > 0;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const toggleFavorite = async () => {
    const favorites = await apiService.getAll('favorites', `?RecipeId=${recipe.id}`);
    const isFavorite = favorites.length > 0;
    if (isFavorite) {
      deleteFavorite(favorites[0].id);
    } else {
      addToFavorites();
    }
  }

  const addToFavorites = async () => {
    try {
      const favorite = await submitFavorite(recipe.id);
      if (favorite.success) {
        toast.success("Recette ajoutée aux favoris !");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteFavorite = async (favoriteId) => {
    try {
      const res = await apiService.deleteById('favorites', favoriteId);
      if (res.success) {
        toast.success("Recette retirée des favoris !");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRecipe()
  }, [recipeUrl]);

  const handleAddPerson = () => {
    setNbPerson(prevNbPerson => prevNbPerson + 1);
  };

  const handleRemovePerson = () => {
    if (nbPerson > 1) {
      setNbPerson(prevNbPerson => prevNbPerson - 1);
    }
  };

  const getAccompaniment = async () => {
    try {
      const res = await apiService.getAll('accompaniment', `/${recipe.id}`);
      if (!res.error) {
        const accompaniment = JSON.parse(res.content);
        setAccompaniments(accompaniment);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  // if(loading) {
  //   return (
  //     <div>
  //       <h1 className={"font-medium text-4xl mb-4"}><Skeleton width={300} height={40} /></h1>
  //
  //       <div className="grid grid-cols-3 gap-4">
  //         <div className={"col-span-2"}>
  //
  //           <div className={"grid grid-cols-2 gap-2"}>
  //
  //             <div className={'col-span-12 flex gap-4 justify-between'}>
  //               <div className={'flex gap-4'}>
  //                 <Skeleton width={100} height={20} />
  //                 <Skeleton width={100} height={20} />
  //                 <Skeleton width={100} height={20} />
  //               </div>
  //               <Skeleton width={200} height={20} />
  //             </div>
  //
  //             <div className="recipe-media col-span-12">
  //               <Skeleton width={"100%"} height={400} />
  //             </div>
  //
  //             <div className={'col-span-12 flex gap-4 mb-4'}>
  //               <Skeleton width={200} height={50} />
  //               <Skeleton width={200} height={50} />
  //             </div>
  //
  //           </div>
  //
  //           <div className={"grid grid-cols-5 gap-8"}>
  //
  //             <div className="recipe-instructionContent col-span-3">
  //               <Skeleton width={300} height={40} />
  //               <Skeleton count={5} />
  //             </div>
  //
  //             <div className="recipe-ingredientsContent col-span-2">
  //               <Skeleton width={300} height={40} />
  //               <Skeleton count={5} />
  //             </div>
  //           </div>
  //
  //           <Skeleton width={300} height={40} />
  //
  //           <div className="my-8">
  //             <Skeleton count={3} height={50} />
  //           </div>
  //
  //           <div className="my-4">
  //             <Skeleton count={5} height={50} />
  //           </div>
  //
  //           <div className={"my-4"}>
  //             <Skeleton count={3} height={50} />
  //           </div>
  //         </div>
  //
  //         <div className={"col"}>
  //           <h1 className={"text-xl font-medium mb-4"}><Skeleton width={300} height={40} /></h1>
  //
  //           <div className="col gap-4">
  //             <div className={'col gap-4'}>
  //               {Array.from({ length: 3 }).map((_, index) => (
  //                 <div className="flex gap-4">
  //                   <Skeleton circle={true} height={70} width={70} />
  //                   <Skeleton count={3} height={20} width={300} />
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return <NotFoundPage />;
  }

  return (
      <div>

        <div className="grid grid:cols-1 xl:grid-cols-3 gap-4">
          <h1 className={"font-medium text-4xl mb-4 col-span-2"}>{recipe?.title}</h1>
          <div className={"col-span-2 xl:col-span-2"}>

            {/*Information générale sur la recette*/}
            <div className={"grid grid-cols-2 gap-2"}>

              <div className={'col-span-12 flex gap-4 justify-between'}>
                <div className={'flex gap-4'}>
                  <Text className={'flex items-center gap-1'}>
                    <Icon icon="mdi:clock-outline" style={{ color: 'black' }} />
                    <span>{recipe?.duration} min</span>
                  </Text>
                  <Text className={'flex items-center gap-1'}>
                    <Icon icon="ic:baseline-stars" style={{ color: 'black' }} />
                    <span className={"lowercase first-letter:capitalize"}>{recipe?.level}</span>
                  </Text>
                  <span className={'flex items-center gap-1'}>
                    <Icon icon="mdi:tags" style={{ color: 'black' }} />
                    {recipe?.tags.map((tag, index) => (
                        <Link to={`/recettes?tag=${tag}`} key={index} className={'lowercase first-letter:capitalize'}>{tag}{index !== recipe.tags.length - 1 ? ' - ' : ''}</Link>
                    ))
                    }
                  </span>
                </div>
                <span className={'flex items-center space-x-2'}>
              <span><span className={'font-bold text-xl'}>{
                  Math.round(recipe?.average_rating * 10) / 10
              }</span>/5</span>
              <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 22 20">
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="w-1 h-1 mx-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <Link to={`/recettes/${recipeUrl}/comments`} className={"text-sm font-medium text-gray-900 underline hover:no-underline"}>{recipe?.nb_rating} notes</Link>
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

              <div className="flex justify-between mb-4 gap-4">
                <Button className="flex items-center gap-2 btn bezel" onClick={() => toggleFavorite()}>
                  <Icon icon="ic:baseline-favorite"/>
                  <span>Ajouter aux favoris</span>
                </Button>
                <Button className="flex items-center gap-2 btn bezel" onClick={() => window.print()}>
                  <Icon icon="ic:round-local-printshop"/>
                  <span>Imprimer</span>
                </Button>
              </div>


            </div>

            <div className={"grid grid-cols-1 lg:grid-cols-5 gap-8"}>

              {/*Étapes de préparation*/}
              <div className="recipe-instructionContent col-span-3">
                <p className={"border-b-4 border-b-black w-full font-bold text-xl pb-2 mb-4"}>Étapes de préparation</p>
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
                <p className={"border-b-4 border-b-black w-full font-bold text-xl pb-2 mb-4"}>Ingrédients</p>

                {/*Mise à jour du nombre de personnes*/}
                <div className={"flex w-full justify-around mb-8"}>
                  <Button onClick={handleRemovePerson}>
                    <Icon icon="ic:sharp-remove-circle" style={{ color: 'black', fontSize: 40 }} />
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
                  <Box className={"flex font-bold items-center mb-2 gap-4"}>
                    <Icon icon="flat-color-icons:idea" fontSize={50}/>
                    <Text fontSize={["md", "lg", "2xl"]} >Astuces et conseils pour {recipe?.title}</Text>
                  </Box>
                  <div>
                    <p className={"m-0 px-3 font-light text-lg"}>{recipe?.tips}</p>
                  </div>
                </CardComponent>
            )}

            <div className="my-8">
              <SocialBar />
            </div>

            {recipe && recipe?.id && (
                <div className="my-4">
                  <CommentForm recipeId={recipe?.id} />
                </div>
            )}

            <div className={"my-4"}>
              <CommentComponent comments={recipe?.Comments} recipeUrl={recipe?.url} limit={3} />
            </div>
          </div>

          {/*Recettes suggérées*/}
          <div className={"col-span-2 xl:col-span-1"}>
            <div>
              <h1 className={"text-xl font-medium mb-4 font-serif"}>A DÉGUSTER AUSSI</h1>

              <div className="col gap-4">
                {recommandedRecipes.map((recommandedRecipe, index) => (
                    <>
                      <div className={"effect-grew px-4"} key={index}>
                        <Link key={recommandedRecipe.id} to={`/recettes/${recommandedRecipe.url}`}>
                          <div key={index} className={'row gap-4 h-20'}>
                            <img src={`/img/recipe/${recommandedRecipe.image}`} height={80} width={140}
                                 className={"rounded shadow-md object-cover"} alt="Recipe image"/>
                            <div className={'col justify-between w-full'}>
                              <span className={"font-medium text-md"}>{recommandedRecipe.title}</span>
                              <div className="row justify-between items-center">
                                <ThemeProvider theme={ratingTheme}>
                                  <Rating name="half-rating" value={recommandedRecipe.average_rating} precision={0.5}
                                          readOnly={true}/>
                                </ThemeProvider>
                                <small>({recommandedRecipe.nb_rating} notes)</small>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                ))}
              </div>
            </div>
            <div className="my-8">
              <Button className="flex btn bezel items-center gap-2 w-full justify-center"
                      onClick={() => getAccompaniment()}>
                <Icon icon="ic:outline-restaurant-menu"/>
                <span>Générer des accompagnements parfaits</span>
              </Button>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {accompaniments.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-4">
                      <h2 className="text-xl font-bold">{item.nom}</h2>
                      <p className="mt-2 text-gray-500">{item.description}</p>
                    </div>
                ))}
              </div>
            </div>


          </div>


        </div>
      </div>
  )
      ;
}

export default RecipePage;
