import React from 'react';
import {  AvField } from "availity-reactstrap-validation";

const InputField = ({type,inputName,inputValue,validationLabel="",onChange,placeholder,}) => {
    return ( 
        <>
        <AvField
          type={type}
          name={inputName}
          value={inputValue}
          validate={{
            required: {
              value: true,
              errorMessage: `${validationLabel} is required`,
            },
          }}
          onChange={onChange}
          className="form-control mb-2"
          id
          placeholder={placeholder}
        />
      </>
     
     );
}
 
export default InputField;