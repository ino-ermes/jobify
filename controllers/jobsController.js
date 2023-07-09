import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose';
import moment from 'moment';

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
    const {search, status, jobType, sort} = req.query;

    const queryObject = {
        createdBy: req.user.userId
    };

    if(status !== 'all') {
        queryObject.status = status;
    }

    if(jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    if(search) {
        queryObject.position = {$regex: search, $options: 'i'};
    }

    let result = Job.find(queryObject);

    switch(sort) {
        case 'latest':
            result.sort('-createdAt'); break;
        case 'oldest':
            result.sort('createdAt'); break;
        case 'a-z':
            result.sort('position'); break;
        case 'z-a':
            result.sort('-position'); break;
    }

    const jobs = await result;

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
const showStats = async (req, res) => {
    let stats = await Job.aggregate([{
        $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}
    }, {
        $group: {_id: '$status', total: {$sum: 1}}
    }]);

    stats = stats.reduce((result, value) => {
        result[value._id] = value.total;
        return result;
    }, {});

    const defaultStats = {
        declined: stats.declined ?? 0,
        pending: stats.pending ?? 0,
        interview: stats.interview ?? 0,
    };

    let monthlyApplications = await Job.aggregate([
        {
            $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}
        },
        {
            $group: {
                _id: {
                    month: {
                        $month: '$createdAt'
                    },
                    year: {
                        $year: '$createdAt'
                    }
                },
                count: {$sum: 1}
            }
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1
            }
        },
        {
            $limit: 6
        }
    ]);

    monthlyApplications = monthlyApplications.map((value) => {
        const {_id: {month, year}, count} = value;
        const date = moment().month(month).year(year).format('MMM Y');
        return {date, count};
    });

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});
};

export {createJob, deleteJob, getAllJobs, showStats, updateJob};