import moment from 'moment/moment.js';
import { Rating, ThemeProvider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ratingTheme from '@/theme/ratingTheme.js';

const CommentComponent = ({ comments, recipeUrl, limit }) => {
  const displayedComments = limit ? comments?.slice(0, limit) : comments;
  const url = window.location.href.split("/");

  const renderHeader = () => {
    if (url[url.length - 2] === "comments") {
      return (
        <h2 className={'items-center flex mb-4'}>
          <span className={'font-medium text-2xl'}>Vos Commentaires •</span> {displayedComments?.length}
        </h2>
      );
    }
  }

  return (
    <div>
      {renderHeader()}

      {displayedComments?.map((comment, index) => (
        <div key={index} className="border rounded-md p-3 my-3 bg-gray-50 w-full">
          <div className="flex gap-3 items-center">
            <div
              className={`p-2 h-10 w-10 border border-yellow-500 rounded-full flex justify-center font-medium`}>
              {comment.comment[0]}
            </div>
            <div className={"flex justify-between w-full"}>
              <span>{moment(comment.createdAt).format('DD/MM/YYYY')}</span>
              <ThemeProvider theme={ratingTheme}>
                <Rating name="half-rating" value={comment.rating} precision={0.5} readOnly={true} />
              </ThemeProvider>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            {comment.comment}
          </p>
        </div>
      ))}

      {limit && comments?.length > limit && (
        <div className={"w-full text-center"}>
          <Link to={`/recettes/${recipeUrl}/comments`} className={"text-yellow-400 font-medium underline text-center"}>Lire plus</Link>
        </div>
      )}
    </div>
  );
};

export default CommentComponent;