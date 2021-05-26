import React from 'react';
import { Typography } from '@material-ui/core';

export interface AppDataPointProps {
    label: string,
}
 
const AppDataPoint: React.FC<AppDataPointProps> = ({
    label,
    children,
}) => {
    return (
        <div>
            <Typography variant="h6" align="center" color="textSecondary">{label}</Typography>
            <Typography variant="body1">{children}</Typography>
        </div>
    );
};
 
export default AppDataPoint;