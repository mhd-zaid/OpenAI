import { Link, useParams } from 'react-router-dom';
import { apiService } from '@/services/apiService.js';
import { useEffect, useState } from 'react';
import CommentComponent from '@/components/Recipe/CommentComponent.jsx';
import { Rating, ThemeProvider, Typography } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Pagination from '@/components/Pagination.jsx';
import CommentForm from "@/components/Recipe/CommentForm.jsx";
import { Img } from '@chakra-ui/react';

const CommentsPage = () => {
  const { recipeUrl } = useParams();
  const [ comments, setComments ] = useState([]);
  const [ recipe, setRecipe ] = useState(null);
  const [ recipeAverageRating, setRecipeAverageRating ] = useState(0);
  const [ nbComments, setNbComments ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 6;

  const fetchComments = async (recipeUrl) => {
    try {
      const getRecipe = await apiService.getUserInfo('recipes', `${recipeUrl}`);
      const recipe = getRecipe.data;
        setNbComments(recipe.Comments.length);
      setComments(recipe.Comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      setRecipe(recipe);
      setRecipeAverageRating(recipe.average_rating)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      fetchComments(recipeUrl);
  }, [currentPage]);


  return (
    <div className={""}>
      <div>
        <h1 className={"font-medium text-4xl mb-4 text-yellow-400"}>{nbComments} avis sur cette recette</h1>
        <div className={"flex flex-col-reverse md:flex-row gap-4"}>
          <div>
          <Img src={`/img/recipe/${recipe?.image}`} w={"100%"} h={150} alt="" className={"rounded"}/>
          </div>
          <div className={"col"}>
            <Link to={`/recettes/${recipe?.url}`} className={"font-bold text-2xl"}>{recipe?.title}</Link>
            <div className={"w-full row items-center gap-4"}>
              <ThemeProvider theme={ratingTheme}>
                <Typography variant="overline" component="legend">Cette recette a reçu {Math.round(recipeAverageRating * 10) / 10}/5</Typography>
                <Rating name="half-rating" value={recipeAverageRating} precision={0.5} readOnly={true} />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
      <div className={"my-4"}>
        <CommentForm recipeId={recipe?.id} />
      </div>
      <div className={"my-4"}>
        <CommentComponent comments={comments} recipeUrl={recipeUrl} />
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
    </div>
  );
};

export default CommentsPage;