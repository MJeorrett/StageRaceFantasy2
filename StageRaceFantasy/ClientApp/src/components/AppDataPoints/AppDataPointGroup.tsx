import { Box, styled } from '@material-ui/core';

export default styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    '& > *:not(:last-child)': {
        marginRight: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRight: `1px solid ${theme.palette.text.secondary}`,
    },
}));