import {FormRow, Alert, FormRowSelect} from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

function AddJob() {
    const {
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        handleChange,
        clearValues,
        createJob,
        isLoading,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!position || !company || !jobLocation) {
            displayAlert();
            return;
        }

        if(isEditing) {
            return;
        }
        createJob();
    }

    const handleJobInput = (e) => {handleChange({name: e.target.name, value: e.target.value})};

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        value={jobLocation}
                        onChange={handleJobInput}
                    />
                    <FormRowSelect 
                        lableText='status'
                        list={statusOptions}
                        name='status'
                        onChange={handleJobInput}
                        value={status}
                    />
                    <FormRowSelect 
                        lableText='type'
                        list={jobTypeOptions}
                        name='jobType'
                        onChange={handleJobInput}
                        value={jobType}
                    />
                    <div className='btn-container'>
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button className='btn btn-block clear-btn'
                                onClick={(e) => {e.preventDefault(); clearValues()}}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}

export default AddJob;