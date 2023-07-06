import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

function JobsContainer() {
    const {getJobs, jobs, isLoading, page, totalJobs} = useAppContext();
    useEffect(() => {
        getJobs();
    }, []);

    if(isLoading) {
        return (
            <Wrapper>
                <Loading center/>
            </Wrapper>
        );
    }

    if(totalJobs === 0) {
        return (
            <Wrapper>
                <h1>吐き気がする {page}</h1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className='jobs'>
                {jobs.map((value) => {
                    return <Job key={value._id} {...value}></Job>
                })}
            </div>
        </Wrapper>
    );
}

export default JobsContainer;