import React from 'react';

export default function Input(props) {
  const { name, value, onChange } = props;

  return (
    <div>
      <input
        name={name}
        type="text"
        onChange={onChange}
        autoComplete="off"
        value={value}
      />
    </div>
  );
}
