import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { LoginMenu } from '../api-authorization/LoginMenu';
import AppNavBarButton from './AppNavBarButton';
import { appPaths } from '../../Routes';

const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: theme.spacing(4),
    },
    links: {
        flexGrow: 1,
    },
    buttons: {
        '& > *:not(:last-child)': {
            marginRight: theme.spacing(),
        }
    }
}));

const AppNavBar = () => {
    const classNames = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classNames.title}>
                    Stage Race Fantasy
                </Typography>
                <div className={classNames.links}>
                    <AppNavBarButton linkPath={appPaths.riders}>Riders</AppNavBarButton>
                    <AppNavBarButton linkPath={appPaths.races}>Races</AppNavBarButton>
                </div>
                <div className={classNames.buttons}>
                    <LoginMenu />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavBar;
