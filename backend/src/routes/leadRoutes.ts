import express from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/leadController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(protect, getLeads)
  .post(protect, createLead);

router.route('/:id')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, authorize('Admin'), deleteLead);

export default router;
