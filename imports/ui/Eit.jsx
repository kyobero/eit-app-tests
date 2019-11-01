import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

import Input from './components/input.component.jsx';
import {Eits} from '../api/eits.js';

// Eit component
const Eit = props => {
  const [checked, setChecked] = useState(false);
  // delete handler
  const deleteHandler = () => {
    window.confirm('Confirm delete EIT')
      ? Meteor.call('eit.delete', props.id)
      : '';
  };

  const isChecked = e => {
    e.preventDefault();
    // setChecked(e.target.checked);
    Meteor.call('eit.isChecked', props.id, e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <tr key={props._id}>
      <th scope="row">
        {props.currentUser && props.currentUser._id === props.addedBy ? (
          <Input
            divClass={'form-check'}
            type={'checkbox'}
            className={'form-check-input'}
            onClick={isChecked}
            readOnly
            checked={props.checked}
          />
        ) : (
          ''
        )}
      </th>
      <td>{props.firstName}</td>
      <td>{props.surname}</td>
      <td>{props.age}</td>
      <td>{props.country}</td>
      <td>
        {props.currentUser && props.currentUser._id === props.addedBy ? (
          <div>
            <Link to={`/edit/${props.id}`} className="btn btn-sm btn-light">
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger ml-2"
              type="button"
              onClick={deleteHandler}>
              Delete
            </button>
          </div>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};

export default Eit;