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
            const formattedDataAI = await this.mathService.formatDataUsingAi(result.text())
            const f = await this.mathService.removeDoubleBackslashNewline(formattedDataAI)
            res.json(f);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

