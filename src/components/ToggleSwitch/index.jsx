import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

export default function ToggleSwitch(props) {
  const { id, name, checked, onChange, optionLabels, small, disabled } = props;
  return (
    <div className={styles.toggleSwitch + (small ? styles.smallSwitch : '')}>
      <input
        type="checkbox"
        name={name}
        className={styles.toggleSwitchCheckbox}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label htmlFor="checkbox">{checked ? 'Yes' : 'No'}</label>
      {id ? (
        <label className={styles.toggleSwitchLabel} htmlFor={id}>
          <span
            className={
              disabled
                ? styles.toggleSwitchInner + styles.toggleSwitchDisabled
                : styles.toggleSwitchInner
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? styles.toggleSwitchSwitch + styles.toggleSwitchDisabled
                : styles.toggleSwitchSwitch
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
}

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: [' Yes', 'No'],
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
};
