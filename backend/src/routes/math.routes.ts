import express from 'express'
import MathController from '../controllers/math.controller'
import MathService from '../services/math.service'
const router = express.Router()

const mathService = new MathService()
const mathController = new MathController(mathService)

router.get('/', (req, res) => mathController.getMath(req, res))

export default router