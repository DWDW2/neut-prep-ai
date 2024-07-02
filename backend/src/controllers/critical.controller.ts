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
            const f: criticalTestType[] = await this.criticalService.removeDoubleBackslashNewline(result.text())
            const test = await this.criticalService.saveCriticalDataToDB(f)
            res.json({id: test?.id});
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }

    async getAllCritical(req: Request, res: Response) {
        try {
            const criticalData = await this.criticalService.getAllCriticalData();
            res.json(criticalData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async getCriticalById(req: Request, res: Response) {
        try {
            const criticalData = await this.criticalService.getCriticalDataById(req.params.id);
            if (!criticalData) {
                return res.status(404).send('Critical data not found');
            }
            res.json(criticalData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async createCritical(req: Request, res: Response) {
        try {
            const newCriticalData = await this.criticalService.createCriticalData(req.body.test);
            res.status(201).json(newCriticalData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async updateCritical(req: Request, res: Response) {
        try {
            const updatedCriticalData = await this.criticalService.updateCriticalData(
                req.params.id,
                req.body.test
            );
            if (!updatedCriticalData) {
                return res.status(404).send('Critical data not found');
            }
            res.json(updatedCriticalData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async deleteCritical(req: Request, res: Response) {
        try {
            const deleted = await this.criticalService.deleteCriticalData(req.params.id);
            if (!deleted) {
                return res.status(404).send('Critical data not found');
            }
            res.json({ message: 'Critical data deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}
