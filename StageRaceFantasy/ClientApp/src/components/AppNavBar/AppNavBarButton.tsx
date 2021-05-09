import React from 'react';
import AppButton from '../AppButton';

export interface AppNavBarButtonProps {
    linkPath?: string,
}
 
const AppNavBarButton: React.FC<AppNavBarButtonProps> = ({
    linkPath,
    children,
}) => {
    return (
        <AppButton
            color="inherit"
            variant="text"
            linkPath={linkPath}
        >
            {children}
        </AppButton>
    );
};
 
export default AppNavBarButton;