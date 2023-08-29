import { Router } from 'express';
import LoginController from '../controllers/loginController';

const login = new LoginController();

const loginRouter = Router();

loginRouter.post('/', (req, res) => login.loginUser(req, res));

export default loginRouter;
