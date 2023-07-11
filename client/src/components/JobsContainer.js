import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBntContainner from './PageBtnContainer';
import Alert from './Alert';

function JobsContainer() {
    const {showAlert, getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages} = useAppContext();
    
    useEffect(() => {
        getJobs();
        const timerId = setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [search, searchStatus, searchType, sort, page]);

    if(isLoading && totalJobs === 0) {
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
            {showAlert && <Alert />}
            <h2>{totalJobs} 件がありました</h2>
            <div className='jobs'>
                {jobs.map((value) => {
                    return <Job key={value._id} {...value}></Job>
                })}
            </div>
            {numOfPages > 1 && <PageBntContainner />}
        </Wrapper>
    );
}

export default JobsContainer;