import { Rating, ThemeProvider } from '@mui/material';
import ratingTheme from '@/theme/ratingTheme.js';
import Button from '@/lib/components/Button.jsx';
import { apiService } from '@/services/apiService.js';
import useToken from '@/utils/useToken.js';
import { useNavigate } from 'react-router-dom';

async function submitComment(commentData) {
  try {
    return await apiService.create('comments', commentData);
  } catch (error) {
    console.error(error);
    return { success: false, errors: error };
  }
}

const CommentForm = ({ recipeId }) => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    RecipeId: recipeId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!token) {
      localStorage.setItem('tempComment', formData.comment);
      navigate('/auth/login');
      return;
    }

    const comment = await submitComment(formData);

    if (comment.success) {
      setMessage("Merci pour votre avis ! Compte tenu de la modération, votre avis sera publié sous 24h.");
      setFormData({
        comment: "",
        rating: 0,
        RecipeId: recipeId,
      });
    } else {
      setMessage(comment.errors)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('tempComment')) {
      setFormData(formData => ({ ...formData, comment: localStorage.getItem('tempComment') }));
      localStorage.removeItem('tempComment');
    }
  }, []);

  if(message) {
    return (
      <div className={"grid grid-rows-5 gap-4 recipe-ratingContent rounded my-4"}>
        <div>
          <h2 className={"font-medium text-2xl text-yellow-500"}>Partagez votre avis</h2>
        </div>
        <div className={"text-center"}>
          <p>{message}</p>
        </div>
      </div>
    );
  }

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
            <small>Le commentaire est facultatif, mais votre note est obligatoire.</small>
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