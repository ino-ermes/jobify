import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBntContainner from './PageBtnContainer';

function JobsContainer() {
    const {getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort} = useAppContext();
    useEffect(() => {
        getJobs();
    }, [search, searchStatus, searchType, sort, page]);

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
                <h1>吐き気がする</h1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h2>{totalJobs} 件がありました</h2>
            <div className='jobs'>
                {jobs.map((value) => {
                    return <Job key={value._id} {...value}></Job>
                })}
            </div>
            <PageBntContainner />
        </Wrapper>
    );
}

export default JobsContainer;