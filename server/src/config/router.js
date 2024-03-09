import authRoutes from '../routes/auth.js';
import chatbotRoutes from '../routes/chatbot.js';
import aiSearchRoutes from '../routes/aiSearch.js';
export default (app, express) => {
  app.use('/api', authRoutes(express.Router()));
  app.use('/api/chatbot', chatbotRoutes(express.Router()));
  app.use('/api/search', aiSearchRoutes(express.Router()));
};
