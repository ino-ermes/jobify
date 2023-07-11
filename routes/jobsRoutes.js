import express from 'express';
import * as jobsController from '../controllers/jobsController.js'
import restrictTestUser from '../middleware/restrictTestUser.js';

const router = express.Router();

router.route('/').get(jobsController.getAllJobs).post(restrictTestUser, jobsController.createJob);
router.route('/stats').get(jobsController.showStats);
router.route('/:id').delete(restrictTestUser, jobsController.deleteJob).patch(restrictTestUser, jobsController.updateJob);

export default router;