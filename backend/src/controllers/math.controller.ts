import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import MathService from '../services/math.service';
import { Request, Response } from 'express';
import { mathTestModelType } from '../types/useMath.types'; 
export default class MathController {
    private mathService: MathService
    
    constructor(mathService: MathService) {
        this.mathService = mathService;
    }

    async getMath(req: Request, res: Response) {
        try {
            const result = await this.mathService.getMathData()
            const f = await this.mathService.removeDoubleBackslashNewline(result.text())
            const test = await this.mathService.saveMathDataToDB(f)
            if (test) {
                // res.json({id: test._id});
                return {id: test._id}
            } else {
                res.status(500).send('Error saving math data to database');
                return null;
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllMath(req: Request, res: Response) {
        try {
            const mathData = await this.mathService.getAllMathData();
            res.json(mathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

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

    async createMath(req: Request, res: Response) {
        try {
            const newMathData = await this.mathService.createMathData(req.body.answer);
            res.status(201).json(newMathData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async updateMath(req: Request, res: Response) {
        try {
            const updatedMathData = await this.mathService.updateMathData(
                req.params.id,
                req.body
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
