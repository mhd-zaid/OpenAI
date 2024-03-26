import React, { useEffect, useState } from 'react';
import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Button from '@/lib/components/Button.jsx';
import { apiService } from '@/services/apiService.js'
import useToken from '@/utils/useToken.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!token) {
      localStorage.setItem('tempComment', formData.comment);
      navigate('/auth/login');
      return;
    }

    const user = apiService.getAll('users', `token=${token}`);
    setFormData({ ...formData, UserId: user[0]?.id });
    const comment = await submitComment(formData);

    if (!comment?.errors) {
      toast('Comment submitted');
      console.log('Comment submitted');
    } else {
      console.error(comment.errors);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('tempComment')) {
      setFormData({ ...formData, comment: localStorage.getItem('tempComment') });
      localStorage.removeItem('tempComment');
    }
  }, [])

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
              defaultValue={formData.rating}
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