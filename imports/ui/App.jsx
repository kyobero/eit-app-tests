import React, {useState} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

// data from the collection
import {Eits} from '../api/eits.js';

import Eit from './Eit.jsx';
import Nav from './components/nav.component.jsx';

const RenderData = props => {
  return props.eits.map(eit => (
    <Eit
      {...props}
      key={eit._id}
      id={eit._id}
      firstName={eit.firstName}
      surname={eit.surname}
      age={eit.age}
      checked={eit.checked}
      country={eit.country}
      addedBy={eit.addedBy}
    />
  ));
};

const App = props => {
  const [checked, setChecked] = useState(false);

  const bulkDelete = e => {
    e.preventDefault();
    Meteor.call('eit.bulkDelete');
    console.log('something');
  };
  console.log(props.eits);

  return (
    <div>
      <Nav />
      <div className="container">
        {props.currentUser ? (
          <div>
            <Link to="/create" className="btn my-5 btn-primary">
              Add EIT
            </Link>

            <button
              type="button"
              className="btn btn-danger my-5 float-right ml-auto"
              onClick={bulkDelete}>
              Bulk Delete
            </button>
          </div>
        ) : (
          ''
        )}
        <table className="table table-striped table-bordered">
          <thead className="table table-striped">
            <tr>
              <th scope="col"></th>
              <th scope="col">Firstname</th>
              <th scope="col">Surname</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Country</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <RenderData eits={props.eits} {...props} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withTracker(() => {
  return {
    eits: Eits.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user()
  };
})(App);