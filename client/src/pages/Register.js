import Wrapper from '../assets/wrappers/RegisterPage';
import {FormRow,  Logo, Alert} from '../components';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAppContext } from '../context/appContext'; 


const initialState = {
    name: '',
    email: '',
    password: '',
};

function Register() {

    const [values, setValues] = useState(initialState);

    const {isLoading, isMember, showAlert, switchRegisterLogin, registerUser, loginUser, user} = useAppContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setTimeout(() => {
                navigate('/');
            }, 0);
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!values.email || !values.password || (!values.name && !isMember)) {
            return;
        }
        const currentUser = {...values};
        if(isMember) {
            loginUser(currentUser);
        } else {
            registerUser(currentUser);
        }
    };
    const handleSwitch = (e) => {
        e.preventDefault();
        switchRegisterLogin();
    };

    const loginTestUse = (e) => {
        e.preventDefault();
        loginUser({
            email: 'stairwaytoheaven@shin.sekai',
            password: 'stairwaytoheaven@shin.sekai'
        });
    };

    return (
        <Wrapper className='full-page'>
            <form className='form'>
                <Logo />
                <h3>{isMember? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {isMember || <FormRow type='text' name='name' value={values.name} onChange={handleChange}/>}
                <FormRow type='email' name='email' value={values.email} onChange={handleChange}/>
                <FormRow type='password' name='password' value={values.password} onChange={handleChange}/>
                <button disabled={isLoading} className='btn btn-block' onClick={onSubmit}>{isMember ? 'login' : 'register'}</button>
                <button 
                    disabled={isLoading} 
                    className='btn btn-block btn-hipster'
                    onClick={loginTestUse}
                >
                    test user
                    </button>
                {isMember ? <p>Not a member yet? <button className='member-btn' onClick={handleSwitch}>Register</button></p> :
                                <p>Already have an account? <button className='member-btn' onClick={handleSwitch}>Login</button></p>}
            </form>
        </Wrapper>
    );
}

export default Register;