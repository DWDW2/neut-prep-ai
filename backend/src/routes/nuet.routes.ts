import express from 'express';
import NuetCombinedController from '../controllers/nuet-combined.controller';
import CriticalController from '../controllers/critical.controller';
import MathController from '../controllers/math.controller';
import MathService from '../services/math.service';
import CriticalService from '../services/critical.service';
const router = express.Router();

const criticalService = new CriticalService();
const mathService = new MathService();
const criticalController = new CriticalController(criticalService);
const mathController = new MathController(mathService);

const nuetCombinedController = new NuetCombinedController(
  criticalController,
  mathController,
);

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const nuetId = await nuetCombinedController.getNuetCombined(req, res);
    res.status(201).json({ id: nuetId?.id });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
