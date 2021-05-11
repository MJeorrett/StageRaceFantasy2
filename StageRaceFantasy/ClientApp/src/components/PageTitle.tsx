import React from 'react';
import { Typography } from '@material-ui/core';

const AppPageTitle: React.FC = ({
    children,
}) => {
    return (
        <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            color="primary"
        >
            {children}
        </Typography>
    );
};
 
export default AppPageTitle;