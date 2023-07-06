import { createContext, useContext, useReducer } from 'react';
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SWITCH_REGISTER_LOGIN,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_ERROR,
    CREATE_JOB_SUCESS,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
} from './action';
import reducer from './reducer';
import axios from 'axios';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    isMember: false,
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: true,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
};

const AppContext = createContext();

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT});
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT});
        }, 3000);
    };

    const switchRegisterLogin = () => {
        dispatch({type: SWITCH_REGISTER_LOGIN});
    };

    const registerUser = async (currentUser) => {
        dispatch({type: REGISTER_USER_BEGIN});
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser);
            const {user, token, location} = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user, token, location,
                },
            });
            addUserToLocalStorage({user, token, location});
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    };

    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN});
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser);
            const {user, token, location} = response.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user, token, location,
                },
            });
            addUserToLocalStorage({user, token, location});
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    };

    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    };

    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR});
    };

    const logoutUser = () => {
        dispatch({type: LOGOUT_USER});
        removeUserFromLocalStorage();
    };

    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN});
        try {
            const {data} = await authFetch.patch('auth/updateUser', currentUser);

            const {user, location, token} = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {user, token, location},
            });

            addUserToLocalStorage({user, location, token});
        } catch(error) {
            if(error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: {msg: error.response.data.msg},
                })
            }
        }
        clearAlert();
    }

    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    authFetch.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if(error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    const handleChange = ({name, value}) => {
        dispatch({type: HANDLE_CHANGE, payload: {name, value}});
    };

    const clearValues = () => {
        dispatch({type: CLEAR_VALUES});
    }

    const createJob = async () => {
        dispatch({type: CREATE_JOB_BEGIN});
        try {
            const {position, company, jobLocation, jobType, status} = state;

            await authFetch.post('/jobs', {company, position, jobLocation, jobType, status});

            dispatch({type: CREATE_JOB_SUCESS});
            dispatch({type: CLEAR_VALUES});
        } catch(error) {
            if(error.response.status === 401) return;
            dispatch({type: CREATE_JOB_ERROR, payload: {msg: error.response.data.msg}});
        }
        clearAlert();
    };

    const getJobs = async () => {
        let url = `/jobs`;
        dispatch({type: GET_JOBS_BEGIN});
        try {
            const {data} = await authFetch.get(url);
            const {jobs, totalJobs, numOfPages} = data;
            dispatch({type: GET_JOBS_SUCCESS, payload: {jobs, totalJobs, numOfPages}});
        } catch(error) {
            //logoutUser();
            console.log(error.response);
        }
        clearAlert();
    }

    const setEditJob = (id) => {
        console.log('editing ', id);
    };

    const deleteJob = (id) => {
        console.log('delete ', id);
    };

    return (
        <AppContext.Provider value={{...state, setEditJob, deleteJob, getJobs, createJob, clearValues, handleChange, displayAlert, switchRegisterLogin, registerUser, loginUser, toggleSidebar, logoutUser, updateUser}}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };