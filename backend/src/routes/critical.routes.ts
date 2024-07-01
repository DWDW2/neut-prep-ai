import express from 'express'
import CriticalController from '../controllers/critical.controller'
import CriticalService from '../services/critical.service'
const router = express.Router()

const criticalService = new CriticalService()
const criticalController = new CriticalController(criticalService)

router.get('/', (req, res) => criticalController.getCritical(req, res))

export default router