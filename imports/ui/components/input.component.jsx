import React from 'react';

const Input = props => {
  return (
    <div className={props.divClass}>
      <label htmlFor={props.htmlFor}>{props.labelName}</label>
      <input
        value={props.value}
        name={props.name}
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        onChange={props.onChange}
        hidden={props.hidden}
        readOnly={props.readOnly}
        defaultValue={props.defaultValue}
        checked={props.checked}
        onClick={props.onClick}
      />
    </div>
  );
};

export default Input;