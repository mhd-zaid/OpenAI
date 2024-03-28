import { Link, useParams } from 'react-router-dom';
import { apiService } from '@/services/apiService.js';
import { useEffect, useState } from 'react';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import { Rating, ThemeProvider, Typography } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Pagination from '@/components/Pagination.jsx';

const CommentsPage = () => {
  const { recipeUrl } = useParams();
  const [ comments, setComments ] = useState([]);
  const [ recipe, setRecipe ] = useState(null);
  const [ recipeAverageRating, setRecipeAverageRating ] = useState(0);
  const [ nbComments, setNbComments ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage, setItemsPerPage ] = useState(5);

  const fetchComments = async (recipeUrl) => {
    try {
      const getRecipe = await apiService.getOne('recipes', `${recipeUrl}`);
      const recipe = getRecipe.data;

      setComments(recipe.Comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      setRecipe(recipe);
      setRecipeAverageRating(recipe.average_rating)
      setNbComments(recipe.Comments.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments(recipeUrl);
  }, [currentPage]);


  return (
    <div className={"w-3/4"}>
      <div>
        <h1 className={"font-medium text-4xl mb-4 text-yellow-400"}>{nbComments} avis sur cette recette</h1>
        <div className={"row gap-4"}>
          <img src="https://placehold.co/70x70" alt="" className={"rounded"}/>
          <div>
            {/*<p className={"font-medium text-2xl"}>{recipe?.title}</p>*/}
            <Link to={`/recettes/${recipe?.url}`} className={"font-medium text-2xl underline"}>{recipe?.title}</Link>
            <div className={"w-full row items-center gap-4"}>
              <ThemeProvider theme={ratingTheme}>
                <Typography variant="h6" component="legend">Note moyenne {recipe?.average_rating}/5</Typography>
                <Rating name="half-rating" value={recipeAverageRating} precision={0.5} readOnly={true} />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
      <CommentComponent comments={comments} recipeUrl={recipeUrl} />
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
    </div>
  );
};

export default CommentsPage;