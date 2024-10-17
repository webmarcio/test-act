import { Request, Response } from "express";

import CategoryModel, { CategoryEntity } from "../../domain/entities/category";

export class CategoryController {
  async create (req: Request, res: Response) {
    const {
      title,
    } = req.body;

    try {
      
      const category = new CategoryModel({
        title,
      });

      const savedCategory: CategoryEntity = (await category.save());
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar categoria', error: error });
    }
  }

  async getAllCategories (req: Request, res: Response) {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar categorias', error });
    }
  }

  async getCategoryById (req: Request, res: Response) {
    const { categoryId } = req.params;
    try {
      const category = await CategoryModel.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar categoria', error });
    }
  }

  async updateCategory (req: Request, res: Response) {
    const { categoryId } = req.params;
    const {
      title,
    } = req.body;

    const category: CategoryEntity = {} 

    if (title) category.title = title;
    
    try {
      const result = await CategoryModel.updateOne({ _id: categoryId }, category);
      if (result) res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados da categoria', error });
    }
  }

  async deleteCategory (req: Request, res: Response) {
    const { categoryId } = req.params;

    try {
      const result = await CategoryModel.deleteOne({ _id: categoryId });
      if (result) res.status(200).json({ message: 'Categoria removida com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover categoria', error });
    }
  }
}