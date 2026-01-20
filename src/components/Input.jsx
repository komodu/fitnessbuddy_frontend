import { useState } from 'react';

const Input = ({value, type, onChange, placeholder, label}) =>{
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleShowPassword = () =>{
        setShowPassword(!showPassword)
    };

    return (
    <div className="form-outline form-floating my-3" >
      <input
        className="form-control"
        id={`floating${label}`}
        label={label}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // This will trigger the `onChange` passed from the parent
        />
        {label && <label for={`floating${label}`}>{label}</label>}
      {type === 'password' && (
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
    )
}
export default Input;