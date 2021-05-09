import React from 'react';
import { NavLink } from 'react-router-dom';
import { appPaths } from '../Routes';
import { LoginMenu } from './api-authorization/LoginMenu';

export const NavMenu: React.FC = () => {
    return (
        <header>
            <div>
                <ul>
                    <li>
                        <NavLink className="text-dark" to={appPaths.home}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="text-dark" to={appPaths.fantasyStageRaces}>Races</NavLink>
                    </li>
                    <LoginMenu />
                </ul>
            </div>
        </header>
    );
};
