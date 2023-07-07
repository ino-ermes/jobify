import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js'

const createJob = async (req, res) => {
    const {position, company} = req.body;
    if(!position || !company) {
        throw new BadRequestError('クソッタレ');
    }

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({job});
};
const deleteJob = async(req, res) => {
    const {id: jobId} = req.params;

    const job = await Job.findById(jobId);

    if(!job) {
        throw new NotFoundError('Life has just begun, but now i\'m gonna throw it all away');
    }

    checkPermissions(req.user, job.createdBy);

    await job.deleteOne();

    res.status(StatusCodes.OK).json({msg: 'Open your eyes, look up to the sky and see'})
};
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1});
};
const updateJob = async (req, res) => {
    const {id: jobId} = req.params;

    const {position , company} = req.body;

    if(!position || !company) {
        throw new BadRequestError('疎ましい');
    }

    const job = await Job.findById(jobId);

    if(!job) {
        throw new NotFoundError('取り出した');
    }

    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {new: true, runValidators: true});

    res.status(StatusCodes.OK).json(updatedJob);
};
const showStats = (req, res) => {
    res.send('showStats');
};

export {createJob, deleteJob, getAllJobs, showStats, updateJob};