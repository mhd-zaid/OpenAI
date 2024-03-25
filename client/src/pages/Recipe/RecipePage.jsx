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

const RecipePage = () => {
  const { recipeUrl } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await apiService.getAll('recipes', `url=${recipeUrl}`);
      if (res.data.length > 0) {
        setRecipe(res.data[0]);
        console.log(res.data[0]);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1 className={"font-medium text-4xl mb-4"}>{recipe?.title}</h1>

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
        <div className="recipe-instructionContent col-span-3">
          <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2"}>Étapes de préparation</p>
          <div>
            <ol>
              {recipe?.instructions && recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="recipe-ingredientsContent col-span-2">
          <p className={"border border-b-4 border-b-black w-full font-medium text-2xl pb-2"}>Ingrédients</p>

          <div className={"flex w-full justify-around mb-8"}>
            <Button className={"rounded-full flex"}>
              <Icon icon="ic:outline-add-circle" style={{ color: "black", fontSize: 40 }} />
            </Button>
            <span
              className={'m-0 text-xl flex items-center'}>{recipe?.nb_person} {recipe?.nb_person === 1 ? 'personnes' : 'personnes'}</span>
            <Button>
              <Icon icon="ic:sharp-remove-circle" style={{ color: 'black', fontSize: 40, boxShadow: "revert-layer" }} />
            </Button>
          </div>
          <ul>
            {recipe?.Quantities && recipe.Quantities.map((ingredient, index) => (
              // <li key={index}>{ingredient.quantity} {ingredient.id}</li>
              <li key={index} className={"list-none text-lg"}>
                <span className={"font-medium"}>400 g </span>
                <span>Lait concentré sucré</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {recipe?.tips && (
        <CardComponent variant={"withShadow"} boxShadow={{color:"#d69a06", position:"bottomRight"}} className={"w-full"}>
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
  );
}

export default RecipePage;
