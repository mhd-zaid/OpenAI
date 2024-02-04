import authRoutes from '../routes/auth.js';
export default (app,express) => {
    app.use('/api', authRoutes(express.Router()));
}