// home/zhansar/projects/neut-prep-ai/backend/src/controllers/math.controller.ts
import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import MathService from '../services/math.service';
import { Request, Response } from 'express';
import { mathTestModelType } from '../types/useMath.types'; // Import the type for your model
export default class MathController {
    private mathService: MathService
    
    constructor(mathService: MathService) {
        this.mathService = mathService;
    }

    async getMath(req: Request, res: Response) {
        try {
            const result = await this.mathService.getMathData()
            const formattedDataAI = await this.mathService.formatDataUsingAi(result.text())
            const f = await this.mathService.removeDoubleBackslashNewline(formattedDataAI)
            const test = await this.mathService.saveMathDataToDB(f)
            res.json({id: test?._id});
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // GET all math data
    async getAllMath(req: Request, res: Response) {
        try {
            const mathData = await this.mathService.getAllMathData();
            res.json(mathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // GET math data by ID
    async getMathById(req: Request, res: Response) {
        try {
            const mathData = await this.mathService.getMathDataById(req.params.id);
            if (!mathData) {
                return res.status(404).send('Math data not found');
            }
            res.json(mathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // CREATE new math data
    async createMath(req: Request, res: Response) {
        try {
            const newMathData = await this.mathService.createMathData(req.body.answer);
            res.status(201).json(newMathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // UPDATE math data by ID
    async updateMath(req: Request, res: Response) {
        try {
            const updatedMathData = await this.mathService.updateMathData(
                req.params.id,
                req.body.answer
            );
            if (!updatedMathData) {
                return res.status(404).send('Math data not found');
            }
            res.json(updatedMathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // DELETE math data by ID
    async deleteMath(req: Request, res: Response) {
        try {
            const deleted = await this.mathService.deleteMathData(req.params.id);
            if (!deleted) {
                return res.status(404).send('Math data not found');
            }
            res.json({ message: 'Math data deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}
