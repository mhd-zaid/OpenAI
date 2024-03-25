import { useParams } from 'react-router-dom';
import { apiService } from '@/services/apiService.js';
import { useEffect, useState } from 'react';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import { Rating, ThemeProvider, Typography } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';

const CommentsPage = () => {
  const { recipeUrl } = useParams();
  const [ comments, setComments ] = useState([]);
  const [ recipe, setRecipe ] = useState(null);
  const [ nbComments, setNbComments ] = useState(0);

  const fetchComments = async (recipeUrl) => {
  try {
    const getRecipe = await apiService.getAll('recipes', `url=${recipeUrl}`)
      .then((response) => response.json())
    const recipe = getRecipe.data[0];

    const res = await apiService.getAll('comments', `RecipeId=${recipe.id}&limit=5`);
console.log("res", res);
    const header = res.headers;
    console.log("header", header);
    setComments(res.json().data);
    setRecipe(recipe);
    console.log("header total count", res.getAllResponseHeaders());
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchComments(recipeUrl);
  }, []);


  return (
    <div className={"w-3/4"}>
      <div>
        <h1 className={"font-medium text-4xl mb-4 text-yellow-400"}>{nbComments || 0} avis sur cette recette</h1>
        <div>
          <p className={"font-medium text-2xl"}>{recipe?.title}</p>
          <div className={"w-full row items-center gap-4"}>
              <ThemeProvider theme={ratingTheme}>
                <Typography variant="h6" component="legend">Note moyenne {recipe?.average_rating}/5</Typography>
                <Rating name="half-rating" value={recipe?.average_rating} precision={0.5} readOnly={true} />
              </ThemeProvider>
          </div>
        </div>
      </div>
      <CommentComponent comments={comments} recipeUrl={recipeUrl} />
    </div>
  );
};

export default CommentsPage;