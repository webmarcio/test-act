import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../../infrastructure/middlewares/verifyToken';

const router = Router();
const userController = new UserController();

router.post('/user', (req, res) => userController.createUser(req, res));
router.get('/users', verifyToken, (req, res) => userController.getUsers(req, res));
router.get('/user/:id', verifyToken, (req, res) => userController.getUserById(req, res));
router.put('/user/:id', verifyToken, (req, res) => userController.updateUser(req, res));
router.delete('/user/:id', verifyToken, (req, res) => userController.deleteUser(req, res));

router.delete('/user/:id', verifyToken, (req, res) => userController.deleteUser(req, res));

export default router;