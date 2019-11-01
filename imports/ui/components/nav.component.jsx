import React from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light">
      <a href="#" className="navbar-brand">
        MEST EIT MANAGEMENT SYSTEM
      </a>
      <div className="col-3 float-right ml-auto">
        <button className="btn btn-primary">
          <AccountsUIWrapper />
        </button>
      </div>
    </nav>
  );
};

export default Nav;