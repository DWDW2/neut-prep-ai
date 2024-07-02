import { EnhancedGenerateContentResponse } from '@google/generative-ai';
import CriticalService from '../services/critical.service';
import { Request, Response } from 'express';
import { criticalTestType } from '../types/useCritical.types';
export default class CriticalController {
    private criticalService: CriticalService
    
    constructor(criticalService: CriticalService) {
        this.criticalService = criticalService;
    }

    async getCritical(req: Request, res: Response) {
        try {
            const result = await this.criticalService.getCriticalData()
            const formattedData = await this.criticalService.formatDataUsingAi(result.text())
            const f: criticalTestType[] = await this.criticalService.removeDoubleBackslashNewline(formattedData)
            await this.criticalService.saveCriticalDataToDB(f)
            res.json(f);
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }

}

