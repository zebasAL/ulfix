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
};

TextField.defaultProps = {
  onSubmit: () => {},
  label: '',
  required: false,
};

export default TextField;
