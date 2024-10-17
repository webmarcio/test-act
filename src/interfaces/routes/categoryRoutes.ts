import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { verifyToken } from '../../infrastructure/middlewares/verifyToken';

const router = Router();
const categoryController = new CategoryController();

router.post('/create-category', verifyToken, (req, res) => categoryController.create(req, res));
router.get('/get-all-categories', verifyToken, (req, res) => categoryController.getAllCategories(req, res));
router.get('/get-category/:categoryId', verifyToken, (req, res) => categoryController.getCategoryById(req, res));
router.put('/update-category/:categoryId', verifyToken, (req, res) => categoryController.updateCategory(req, res));
router.delete('/delete-category/:categoryId', verifyToken, (req, res) => categoryController.deleteCategory(req, res));

export default router;