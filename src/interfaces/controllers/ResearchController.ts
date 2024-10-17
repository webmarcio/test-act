import { Request, Response } from "express";

import ResearchModel, { researchEntity } from "../../domain/entities/research";

export class ResearchController {
  async create (req: Request, res: Response) {
    const {
      title,
      question,
      category,
    } = req.body;

    try {
      
      const research = new ResearchModel({
        title,
        question,
        category,
      });

      const savedResearch: researchEntity = (await research.save());
      res.status(201).json(savedResearch);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar pesquisa', error: error });
    }
  }

  async getAllResearches (req: Request, res: Response) {
    try {
      const researches = await ResearchModel.find();
      res.status(200).json(researches);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pesquisas', error });
    }
  }

  async getResearchById (req: Request, res: Response) {
    const { researchId } = req.params;
    try {
      const research = await ResearchModel.findById(researchId);
      res.status(200).json(research);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pesquisa', error });
    }
  }

  async updateResearch (req: Request, res: Response) {
    const { researchId } = req.params;
    const {
      title,
      question,
      category,
    } = req.body;

    const research: researchEntity = {} 

    if (title) research.title = title;
    if (question) research.question = question;
    if (category) research.category = category;
    
    try {

      const result = await ResearchModel.updateOne({ _id: researchId }, research);
      if (result) res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados da pesquisa', error });
    }
  }

  async deleteResearch (req: Request, res: Response) {
    const { researchId } = req.params;

    try {
      const result = await ResearchModel.deleteOne({ _id: researchId });
      if (result) res.status(200).json({ message: 'Pesquisa removida com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover dados da pesquisa', error });
    }
  }
}