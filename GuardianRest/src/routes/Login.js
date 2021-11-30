const Router = require('express');
const { login, changePassword, forgotPassword } = require('../controllers/login.controller');
const router = Router();
const handleError = require('../helpers/error.check');
const { validateLogin, validateEmail } = require('../validation/validation');

router.post('/',validateLogin, handleError(login));

router.post('/forgot-password',validateEmail, handleError(forgotPassword));

router.put('/change-password/:token', handleError(changePassword));

module.exports=router;
