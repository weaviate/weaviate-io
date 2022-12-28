import React from 'react';
import styles from './styles.module.scss';

export const RadioButton = (props) => {
  const { onChange, id, isSelected, label, value } = props;
  return (
    <div className={styles.radio}>
      <input
        id={id}
        onChange={onChange}
        value={value}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
