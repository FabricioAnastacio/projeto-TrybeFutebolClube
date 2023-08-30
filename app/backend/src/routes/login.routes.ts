import { Router } from 'express';
import LoginController from '../controllers/loginController';
import Validations from '../middleware/validations';

const login = new LoginController();

const loginRouter = Router();

loginRouter.post('/', (req, res) => login.loginUser(req, res));
loginRouter.get('/role', Validations.validateJWT, (req, res) => login.getRole(req, res));

export default loginRouter;
