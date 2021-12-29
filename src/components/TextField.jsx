import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  value,
  setValue,
  onSubmit,
  label,
  type,
  required,
  id,
  disabled,
}) => (
  <div className="todo-field text-field">
    <input
      id={id}
      value={value}
      type={type}
      placeholder={label}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && value) {
          onSubmit();
        }
      }}
      required={required}
      disabled={disabled}
    />
  </div>
);

TextField.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  onSubmit: () => {},
  label: '',
  required: false,
  disabled: false,
};

export default TextField;
