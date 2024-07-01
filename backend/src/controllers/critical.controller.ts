import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import CriticalService from '../services/critical.service';
import { Request, Response } from 'express';
export default class CriticalController {
    private criticalService: CriticalService
    
    constructor(criticalService: CriticalService) {
        this.criticalService = criticalService;
    }

    async getCritical(req: Request, res: Response) {
        try {
            const result = await this.criticalService.getCriticalData()
            const formattedData = await this.criticalService.removeDoubleBackslashNewline(result.text())
            res.json(formattedData);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

