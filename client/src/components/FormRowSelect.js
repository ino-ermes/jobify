
function FormRowSelect({onChange, value, lableText, name, list}) {

    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {lableText ?? name}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className='form-select'
            >
                {list.map((value, index) => {
                    return <option key={index} value={value}>{value}</option>;
                })}
            </select>
        </div>
    )
}

export default FormRowSelect;