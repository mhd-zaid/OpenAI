import authRoutes from '../routes/auth.js';
import chatbotRoutes from '../routes/chatbot.js';
import aiSearchRoutes from '../routes/aiSearch.js';
import groceryRoutes from '../routes/grocery.js';
import accompanimentRoutes from '../routes/accompaniment.js';
export default (app, express) => {
  app.use('/api', authRoutes(express.Router()));
  app.use('/api/chatbot', chatbotRoutes(express.Router()));
  app.use('/api/search', aiSearchRoutes(express.Router()));
  app.use('/api/grocery', groceryRoutes(express.Router()));
  app.use('/api/accompaniment', accompanimentRoutes(express.Router()));
};
