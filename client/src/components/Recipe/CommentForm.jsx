import React, { useEffect, useState } from 'react';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Button from '@/lib/components/Button.jsx';
import { apiService } from '@/services/apiService.js'
import useToken from '@/utils/useToken.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { comment } from 'postcss';

async function submitComment(commentData) {
  apiService.create('comments', commentData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

const CommentForm = ({ recipeId }) => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    UserId: null,
    RecipeId: recipeId,
  });

  const getRating = async (userId) => {
    try {
      const res = await apiService.getAll('comments', `RecipeId=${recipeId}&UserId=${userId}`);
      if (res.data && Array.isArray(res.data)) {
        const ratings = res.data.map((comment) => {
          return (
            comment.rating,
            comment.comment
          )
        });
        console.log("ratings", ratings);
        setFormData((formData) => ({ ...formData, rating: ratings[0] }));
        console.log("formData", formData);
      } else {
        console.log("Aucun commentaire trouvé ou réponse inattendue de l'API", res);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des évaluations:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!token) {
      localStorage.setItem('tempComment', formData.comment);
      navigate('/auth/login');
      return;
    }

    const comment = await submitComment(formData);

    if (!comment?.errors) {
      toast.success('Merci pour votre avis !');
    } else {
      console.error(comment.errors);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('tempComment')) {
      setFormData(formData => ({ ...formData, comment: localStorage.getItem('tempComment') }));
      localStorage.removeItem('tempComment');
    }

    const fetchUserData = async () => {
      try {
        const res = await apiService.getAll('users', `token=${token}`);
        if (res.data && res.data[0]) {
          setFormData(formData => ({ ...formData, UserId: res.data[0].id }));
        }
        getRating(res.data[0].id);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className={"grid grid-rows-5 gap-4 recipe-ratingContent rounded my-4"}>
        <div>
          <h2 className={"font-medium text-2xl text-yellow-500"}>Partagez votre avis</h2>
        </div>
        <div>
          <ThemeProvider theme={ratingTheme}>
            <Rating
              name="half-rating"
              value={formData.rating}
              precision={0.5}
              onChange={(event, newRate) => {
                setFormData({ ...formData, rating: newRate });
              }}

            />
          </ThemeProvider>
        </div>
        {formData.rating > 0 && (
          <form onSubmit={handleSubmit} className={"w-full col gap-4 items-center"}>
            <textarea className={"w-full h-32 p-2 bg-white border border-gray-300 rounded"}
                      placeholder={"Votre avis... (facultatif)"}
                      value={formData?.comment || localStorage.getItem('tempComment')}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
            <small>Le commentaire est facultatif, mais votre note est obligatoire.</small><small>Compte tenu de la modération, votre avis sera publié sous 24h.</small>
            <div>
              <Button className={"btn bezel"} variant={"rounded"}>Partagez votre avis</Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default CommentForm;