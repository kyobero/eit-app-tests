import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import RenderRoute from '../imports/router.jsx';
import '../imports/accounts-config.jsx';

Meteor.startup(() => {
  render(<RenderRoute />, document.getElementById('react-target'));
});
