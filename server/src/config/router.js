import authRoutes from '../routes/auth.js';
import chatbotRoutes from '../routes/chatbot.js';
import aiSearchRoutes from '../routes/aiSearch.js';
import groceryRoutes from '../routes/grocery.js';
import accompanimentRoutes from '../routes/accompaniment.js';
import recommendationRoutes from '../routes/recommendation.js';
import ingredientRoutes from '../routes/ingredient.js';
import quantityRoutes from '../routes/quantity.js';
import userRoutes from '../routes/user.js';
import commentRoutes from "../routes/comment.js";
import recipeRoutes from "../routes/recipe.js";
import favoriteRoutes from "../routes/favorite.js";
import preferenceRoutes from "../routes/preference.js";
export default (app, express) => {
  app.use('/api', authRoutes(express.Router()));
  app.use('/api/chatbot', chatbotRoutes(express.Router()));
  app.use('/api/search', aiSearchRoutes(express.Router()));
  app.use('/api/grocery', groceryRoutes(express.Router()));
  app.use('/api/accompaniment', accompanimentRoutes(express.Router()));
  app.use('/api/recommendation', recommendationRoutes(express.Router()));
  app.use('/api/ingredients', ingredientRoutes(express.Router())); 
  app.use('/api/quantities', quantityRoutes(express.Router())); 
  app.use('/api/users', userRoutes(express.Router())); 
  app.use('/api/comments', commentRoutes(express.Router())); 
  app.use('/api/recipes', recipeRoutes(express.Router()));
  app.use('/api/preferences', preferenceRoutes(express.Router()));
  app.use('/api/favorites', favoriteRoutes(express.Router()));  
};
