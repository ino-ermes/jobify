import { useAppContext } from '../context/appContext';

function Alert() {
    const {alertText, alertType} = useAppContext();
    return (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
    );
}

export default Alert;