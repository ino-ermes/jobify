import {FormRow, FormRowSelect} from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useMemo, useState } from 'react';

function SearchContainer() {
    const {
        isLoading,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e) => {
        if(isLoading) return;
        handleChange({name: e.target.name, value: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    }

    const [localSearch, setLocalSearch] = useState('');

    const debounce = (fn) => {
        let timerId;
        return (e) => {
            if(isLoading) return;
            clearTimeout(timerId);
            setLocalSearch(e.target.value);
            timerId = setTimeout(() => {
                fn(e);
            }, (1000));
        }
    };

    const optimizedDebounde = useMemo(() => {
        return debounce((e) => {
            handleChange({name: e.target.name, value: e.target.value});
        });
    }, []);

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    <FormRow 
                        type='text'
                        name='search'
                        value={localSearch}
                        onChange={optimizedDebounde}
                    />
                    <FormRowSelect 
                        lableText='job status'
                        name='searchStatus'
                        value={searchStatus}
                        onChange={handleSearch}
                        list={['all', ...statusOptions]}
                    />
                    <FormRowSelect
                        lableText='job type'
                        name='searchType'
                        value={searchType}
                        onChange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    />
                    <FormRowSelect
                        name='sort'
                        value={sort}
                        onChange={handleSearch}
                        list={sortOptions}
                    />
                    <button className='btn btn-danger btn-block' onClick={handleSubmit}>clear filters</button>
                </div>
            </form>
        </Wrapper>
    );
}

export default SearchContainer;