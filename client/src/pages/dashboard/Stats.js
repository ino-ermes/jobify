import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import {StatsContainer, ChartsContainer, Loading} from '../../components';

function Stats() {

    const {isLoading, showStats, monthlyApplications} = useAppContext();
    useEffect(() => {
        showStats();
    }, []);

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    );
}

export default Stats;