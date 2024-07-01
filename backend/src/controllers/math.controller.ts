import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import MathService from '../services/math.service';
import { Request, Response } from 'express';
export default class MathController {
    private mathService: MathService
    
    constructor(mathService: MathService) {
        this.mathService = mathService;
    }

    async getMath(req: Request, res: Response) {
        try {
            const result = await this.mathService.getMathData()
            const formattedData = await this.mathService.removeDoubleBackslashNewline(result.text())
            res.json(formattedData);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

