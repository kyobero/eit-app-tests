import React from 'react';

const Botton = props => {
  return (
    <button type={props.type} className={props.className}>
      {props.buttonName}
    </button>
  );
};

export default Botton;