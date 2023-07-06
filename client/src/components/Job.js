import moment from 'moment';
import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import {Link} from 'react-router-dom';

function Job({_id, position, company, jobLocation, jobType, createdAt, status}) {
    const {setEditJob, deleteJob} = useAppContext();
    let date = moment(createdAt);
    date = date.format('MMM Do, YYYY');

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>
                    {company.charAt(0)}
                </div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation}/>
                    <JobInfo icon={<FaCalendarAlt />} text={date}/>
                    <JobInfo icon={<FaBriefcase />} text={jobType}/>
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            onClick={(e) => {setEditJob(_id)}}
                            className='btn edit-btn'
                        >
                            edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={() => {deleteJob(_id)}}
                        >
                            delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
}

export default Job;