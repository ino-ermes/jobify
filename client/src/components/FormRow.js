
function FormRow({ type, value, name, onChange, labelText }) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input type={type} value={value} name={name} className='form-input' onChange={onChange}/>
        </div>
    );
}

export default FormRow;