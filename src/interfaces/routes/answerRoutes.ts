import { Router } from 'express';
import { AnswerController } from '../controllers/AnswerController';
import { verifyToken } from '../../infrastructure/middlewares/verifyToken';

const router = Router();
const answerController = new AnswerController();

router.post('/create-answer', (req, res) => answerController.create(req, res));

router.get('/get-all-answers', verifyToken, (req, res) => answerController.getAllAnswers(req, res));
router.get('/get-all-by-category', verifyToken, (req, res) => answerController.getAnswersByCategory(req, res));
router.get('/get-all-by-research', verifyToken, (req, res) => answerController.getAnswersByResearch(req, res));

router.get('/answers/export-csv', verifyToken, (req, res) => answerController.exportCSV(req, res));

router.get('/get-answer/:answerId', verifyToken, (req, res) => answerController.getAnswerById(req, res));
router.put('/update-answer/:answerId', verifyToken, (req, res) => answerController.updateAnswer(req, res));
router.delete('/delete-answer/:answerId', verifyToken, (req, res) => answerController.deleteAnswer(req, res));

export default router;