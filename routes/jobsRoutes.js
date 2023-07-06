import express from 'express';
import * as jobsController from '../controllers/jobsController.js'

const router = express.Router();

router.route('/').get(jobsController.getAllJobs).post(jobsController.createJob);
router.route('/stats').get(jobsController.showStats);
router.route('/:id').delete(jobsController.deleteJob).patch(jobsController.updateJob);

export default router;