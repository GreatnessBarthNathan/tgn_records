import { Router } from 'express';
const router = Router();

import {
  getAllRCs,
  createRC,
  getSingleRC,
  updateRC,
  deleteRC,
} from '../controller/rcController.js';

import {
  validateRCInput,
  validateRCIdParam,
} from '../middleware/validationMiddleware.js';

router.post('/', validateRCInput, createRC);

router.get('/', getAllRCs);

router.get('/:id', validateRCIdParam, getSingleRC);

router.patch('/:id', validateRCInput, validateRCIdParam, updateRC);

router.delete('/:id', validateRCIdParam, deleteRC);

export default router;
