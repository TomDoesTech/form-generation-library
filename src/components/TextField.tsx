import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextFieldProps } from '../types';

function TextField(props: TextFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, htmlType = 'text', placeholder } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={htmlType}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}

export default TextField;
