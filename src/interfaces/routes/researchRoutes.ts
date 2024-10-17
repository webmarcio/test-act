import { Router } from 'express';
import { ResearchController } from '../controllers/ResearchController';
import { verifyToken } from '../../infrastructure/middlewares/verifyToken';

const router = Router();
const researchController = new ResearchController();

router.post('/create-research', verifyToken, (req, res) => researchController.create(req, res));
router.get('/get-all-researches', verifyToken, (req, res) => researchController.getAllResearches(req, res));
router.get('/get-research/:researchId', verifyToken, (req, res) => researchController.getResearchById(req, res));
router.put('/update-research/:researchId', verifyToken, (req, res) => researchController.updateResearch(req, res));
router.delete('/delete-research/:researchId', verifyToken, (req, res) => researchController.deleteResearch(req, res));

export default router;