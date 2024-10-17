import { Router } from 'express';
import { UserAuthController } from '../controllers/UserAuthController';

const router = Router();
const userAuthController = new UserAuthController();

router.post('/login', (req, res) => userAuthController.login(req, res));

export default router;