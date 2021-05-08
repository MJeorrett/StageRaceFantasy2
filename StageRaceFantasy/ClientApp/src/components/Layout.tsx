import React from 'react';
import { NavMenu } from './NavMenu';

export const Layout: React.FC = ({
  children,
}) => {

  return (
    <div>
      <NavMenu />
      {children}
    </div>
  );
};
