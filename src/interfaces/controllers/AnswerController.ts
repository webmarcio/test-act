import { Request, Response } from "express";
import { createObjectCsvWriter } from 'csv-writer';
import nodemailer from '../../infrastructure/nodemailer';
import path from 'path';
import fs from 'fs';

import AnswerModel, { AnswerEntity } from "../../domain/entities/answer";
import ResearchModel, { researchEntity } from "../../domain/entities/research";
import EmailService from "../../infrastructure/nodemailer";

export class AnswerController {
  async create (req: Request, res: Response) {
    const {
      name,
      email,
      rating,
      category,
      research,
    } = req.body;
    
    try {
      
      const findedResearch = await ResearchModel.findByIdAndUpdate(
        { _id: research },
        { $inc: { totalResponses: 1 } },
        { new: true }
      );
      
      let average = findedResearch?.averageRating || 0;
      const totalResponses = findedResearch?.totalResponses || 0;
      
      average = (average + rating) / totalResponses;
      
      await ResearchModel.updateOne({ _id: research }, { averageRating: average });
      const result: researchEntity = await ResearchModel.findById(research) || {};

      const answer = new AnswerModel({
        name,
        email,
        rating,
        category,
        research,
      });

      const serviceMail = new EmailService();
      const data = {
        email,
        text: `Agradecemos o preenchimento da ${result.title}`,
        html: `<h1>Agradecemos o preenchimento da ${result.title} </h1>`,
        subject: 'Agradecimento',
      };

      serviceMail.sendEmail({ ...data });
      
      const savedAnswer: AnswerEntity = (await answer.save());
      res.status(201).json(savedAnswer);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar resposta', error: error });
    }
  }
  
  async getAllAnswers (req: Request, res: Response) {
    const { page, limit, sort } = req.query;
    const skip: number = (Number(page) - 1) * Number(limit); 
    const sortable: {} = Number(sort) ? { rating: Number(sort) } : {}
    
    try {
      const answers = await AnswerModel.find()
      .populate({ path: 'category' })
      .populate({ path: 'research' })
      .skip(skip)
      .limit(Number(limit))
      .sort(sortable);
      
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar respostas', error });
    }
  }
  
  async getAnswersByCategory (req: Request, res: Response) {
    const {
      page,
      limit,
      sort,
      categoryId,
    } = req.query;
    
    const skip: number = (Number(page) - 1) * Number(limit); 
    const sortable: {} = Number(sort) ? { rating: Number(sort) } : {}
    
    try {
      const answers = await AnswerModel.find({ category: { _id: categoryId } })
      .populate({ path: 'category' })
      .populate({ path: 'research' })
      .skip(skip)
      .limit(Number(limit))
      .sort(sortable);
      
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar respostas', error });
    }
  }
  
  async getAnswersByResearch (req: Request, res: Response) {
    const {
      page,
      limit,
      sort,
      researchId,
    } = req.query;
    
    const skip: number = (Number(page) - 1) * Number(limit); 
    const sortable: {} = Number(sort) ? { rating: Number(sort) } : {}
    
    try {
      const answers = await AnswerModel.find({ research: { _id: researchId } })
      .populate({ path: 'category' })
      .populate({ path: 'research' })
      .skip(skip)
      .limit(Number(limit))
      .sort(sortable);
      
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar respostas', error });
    }
  }
  
  async getAnswerById (req: Request, res: Response) {
    const { answerId } = req.params;
    try {
      const answer = await AnswerModel.findById(answerId);
      res.status(200).json(answer);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar categoria', error });
    }
  }
  
  async updateAnswer (req: Request, res: Response) {
    const { answerId } = req.params;
    const {
      name,
      email,
      rating,
      category,
      research,
    } = req.body;
    
    const answer: AnswerEntity = {} 
    
    if (name) answer.name = name;
    if (email) answer.email = email;
    if (rating) answer.rating = rating;
    if (category) answer.category = category;
    if (research) answer.research = research;
    
    try {
      const result = await AnswerModel.updateOne({ _id: answerId }, answer);
      if (result) res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados da resposta', error });
    }
  }
  
  async deleteAnswer (req: Request, res: Response) {
    const { answerId } = req.params;
    
    try {
      const result = await AnswerModel.deleteOne({ _id: answerId });
      if (result) res.status(200).json({ message: 'Resposta removida com sucesso!' });
      console.log(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover resposta', error });
    }
  }
  
  async exportCSV (req: Request, res: Response) {
    try {
      const answers = await AnswerModel.find();
      const filePath = path.join(__dirname, 'answers.csv');
      
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: '_id', title: 'ID' },
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'rating', title: 'Rating' },
          { id: 'category', title: 'Category' },
          { id: 'research', title: 'Research' },
          { id: 'createdAt', title: 'Created' },
          { id: 'updatedAt', title: 'Updated' },
        ],
      });
      await csvWriter.writeRecords(answers);
      
      res.download(filePath, 'dados.csv', (err) => {
        if (err) {
          console.error('Erro ao enviar o arquivo:', err);
          res.status(500).send('Erro ao exportar os dados em CSV');
        }

        fs.unlinkSync(filePath);
      });
      
    } catch (error) {
      console.error('Erro ao exportar os dados:', error);
      res.status(500).json({ message: 'Erro ao exportar os dados em CSV', error });
    }
  }
}