import authController from '../controllers/auth.js';
export default function (router) {
    const {login, register, logout, forgotPassword, resetPassword, verifyEmail, checkToken} = authController();
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', logout);
    router.post('/forgotPassword', forgotPassword);
    router.post('/resetPassword', resetPassword);
    router.post('/verifyEmail/:token', verifyEmail);
    router.post('/checkToken', checkToken);
    return router;
}