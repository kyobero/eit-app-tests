import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Eits} from '../api/eits.js';
import {Link} from 'react-router-dom';

// components
import 'bootstrap/dist/css/bootstrap.min.css';
import Botton from './components/button.component.jsx';
import Input from './components/input.component.jsx';
import Nav from './components/nav.component.jsx';

// Edit form component
const Form = props => {
  const initialValue = {};
  const [inputsForm, setInputs] = useState(initialValue);

  //   Get user
  // const user = Eits.findOne({_id: {$eq: props.match.params.id}});
  const user = props.user;

  // handle input changes
  const handleInputChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    setInputs(inputsForm => ({...inputsForm, [name]: value}));
  };

  // update handler
  const updateHandler = e => {
    e.preventDefault();
    const {firstName, surname, age, country} = inputsForm;
    const updatedObj = {
      firstName,
      surname,
      age,
      country
    };
    Meteor.call('eit.update', user._id, updatedObj);

    props.history.push('/');
  };

  return (
    <form onSubmit={updateHandler}>
      <Input
        defaultValue={props.user._id}
        name="id"
        readOnly
        type={'text'}
        hidden
      />
      <Input
        divClass={'form-group'}
        htmlFor={'surname'}
        labelName={'Surname'}
        defaultValue={user.surname}
        onChange={handleInputChange}
        name="surname"
        type={'text'}
        className={'form-control'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'firstname'}
        labelName={'Firstname'}
        defaultValue={user.firstName}
        onChange={handleInputChange}
        name="firstName"
        type={'text'}
        className={'form-control'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'age'}
        labelName={'Age'}
        defaultValue={user.age}
        onChange={handleInputChange}
        name="age"
        type={'text'}
        className={'form-control'}
      />
      <Input
        divClass={'form-group'}
        htmlFor={'country'}
        labelName={'Country'}
        defaultValue={user.country}
        onChange={handleInputChange}
        name="country"
        type={'text'}
        className={'form-control'}
      />
      <Botton
        type={'submit'}
        className={'btn btn-primary'}
        buttonName={'Update'}
      />
      <Link to="/" className="btn btn-secondary-outlone">
        Cancel
      </Link>
    </form>
  );
};

const Edit = props => {
  console.log(props.user);
  return (
    <div>
      <Nav />
      <div className="container my-5">
        <div className="card">
          <div className="card-body">
            {props.user ? <Form {...props} /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTracker(props => {
  const id = props.match.params.id;
  console.log(id);
  return {
    user: Eits.findOne({_id: id})
  };
})(Edit);