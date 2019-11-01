import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

import {Eits} from '../api/eits.js';

// components
import 'bootstrap/dist/css/bootstrap.min.css';
import Botton from './components/button.component.jsx';
import Input from './components/input.component.jsx';
import Nav from './components/nav.component.jsx';

// Create form component
const Form = props => {
  const initialValue = {};
  const [inputsForm, setInputs] = useState(initialValue);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setInputs(inputsForm => ({...inputsForm, [name]: value}));
  };

  const submitHandler = e => {
    e.preventDefault();
    const {firstName, surname, age, country} = inputsForm;
    if (
      (!surname && surname == '') ||
      (!firstName && firstName == '') ||
      (!age && age == '') ||
      (!country && country == '')
    )
      return;
    const createObj = {
      firstName,
      surname,
      age,
      country
    };
    console.log(createObj);
    Meteor.call('eit.insert', createObj);

    props.history.push('/');
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        divClass={'form-group'}
        htmlFor={'surname'}
        labelName={'Surname'}
        value={inputsForm.surname}
        onChange={handleInputChange}
        name="surname"
        type={'text'}
        className={'form-control'}
        placeholder={'Enter your surname'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'firstname'}
        labelName={'Firstname'}
        value={inputsForm.firstName}
        onChange={handleInputChange}
        name="firstName"
        type={'text'}
        className={'form-control'}
        placeholder={'Enter your firstname'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'age'}
        labelName={'Age'}
        value={inputsForm.age}
        onChange={handleInputChange}
        name="age"
        type={'text'}
        className={'form-control'}
        placeholder={'Enter your age'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'country'}
        labelName={'Country'}
        value={inputsForm.country}
        onChange={handleInputChange}
        name="country"
        type={'text'}
        className={'form-control'}
        placeholder={'Enter your country'}
      />
      <Botton
        type={'submit'}
        className={'btn btn-primary'}
        buttonName={'Submit'}
      />
    </form>
  );
};

const Create = props => {
  return (
    <div>
      <Nav />
      <div className="container my-5">
        <div className="card w-75 m-auto bg-light">
          <div className="card-body p-auto">
            <Form {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;