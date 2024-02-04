import authController from '../controllers/auth.js';
export default (router) => {
    const {login, register} = authController();
    router.post('/login', login);
    router.post('/register', register);
    return router;

}
