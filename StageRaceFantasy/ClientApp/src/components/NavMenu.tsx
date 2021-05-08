import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';

export const NavMenu: React.FC = () => {
  return (
    <header>
      <div>
        <ul>
          <li>
            <NavLink className="text-dark" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="text-dark" to="/counter">Counter</NavLink>
          </li>
          <li>
            <NavLink className="text-dark" to="/fetch-data">Fetch data</NavLink>
          </li>
          <li>
            <LoginMenu />
          </li>
        </ul>
      </div>
    </header>
  );
};
