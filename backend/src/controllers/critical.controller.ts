import CriticalService from '../services/critical.service';
import { Request, Response } from 'express';
class CriticalController {
    constructor(private CriticalService: CriticalService) {
        this.CriticalService = CriticalService;
    }

    async getCritical(req: Request, res: Response) {
       const result = await this.CriticalService.getCriticalData()
       res.send({res: result})
    }
}

export default CriticalController;