import React, { useCallback, useState } from 'react';
import { debounce, TableCell } from '@material-ui/core';
import { ApiPaginationQueryParams, getPaginatedRiders } from '../api';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { Rider } from '../models';
import AppTextField from '../components/AppForm/AppTextField';
import AppTableActionButtons from '../components/AppTableActionButtons';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppButton from '../components/AppButton';

export type ExtraColumnDefinition = {
    header: string,
    renderRow: (value: Rider.Summary) => JSX.Element,
}

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
    extraColumns?: ExtraColumnDefinition[],
    actionHeaderContent?: JSX.Element[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
    extraColumns = [],
    actionHeaderContent = [],
}) => {
    const [nameFilter, setNameFilter] = useState('');
    const [nameFilterValue, setNameFilterValue] = useState('');
    const doGetPaginatedRiders = useCallback((queryParams: ApiPaginationQueryParams) => getPaginatedRiders({ ...queryParams, nameFilter }), [nameFilter]);
    const extraColumnHeaders = extraColumns.map(_ => _.header);
    const columnHeaders = ['ID', 'First Name', 'Last Name'].concat(extraColumnHeaders);

    const setNameFilterDebounced = useCallback(debounce(setNameFilter, 500), []);

    const handleNameFilterChange = (nameFilter: string) => {
        setNameFilterValue(nameFilter);
        setNameFilterDebounced(nameFilter);
    };

    const handleClearNameFilter = () => {
        setNameFilterValue('');
        setNameFilter('');
    };

    return (
        <div>
            <AppTableActionButtons>
                <AppTextField
                    label="Filter by name"
                    value={nameFilterValue}
                    onChange={event => handleNameFilterChange(event.target.value)}
                    fullWidth={false}
                />
                <AppButton
                    variant="text"
                    disabled={!nameFilterValue}
                    onClick={handleClearNameFilter}
                >
                    Clear
                </AppButton>
                <AppFlexSpacer />
                {actionHeaderContent}
            </AppTableActionButtons>
            <PaginatedApiTable
                makeRequest={doGetPaginatedRiders}
                headers={columnHeaders}
                renderRowCells={rider => (
                    <>
                        <TableCell width={48}>{rider.id}</TableCell>
                        <TableCell>{rider.firstName}</TableCell>
                        <TableCell>{rider.lastName}</TableCell>
                        {extraColumns.map(extraColumn => (
                            extraColumn.renderRow(rider)
                        ))}
                    </>
                )}
                actionButtons={actionButtons}
                noEntitiesMessage={nameFilter ?
                    `No riders match the filter '${nameFilter}'.` :
                    'You don\'t have any riders yet.'
                }
            />
        </div>
    );
};

export default RidersTable;