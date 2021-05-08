import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '500px',
        marginRight: 'auto',
        marginLeft: 'auto',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    }
}));

const AppForm: React.FC = ({
    children,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};
 
export default AppForm;