import {FormRow, FormRowSelect} from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

function SearchContainer() {
    const {
        isLoading,
        search,
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
        clearFilters();
    }

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    <FormRow 
                        type='text'
                        name='search'
                        value={search}
                        onChange={handleSearch}
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