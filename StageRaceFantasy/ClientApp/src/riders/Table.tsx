import React, { useCallback } from 'react';
import { debounce, TableCell } from '@material-ui/core';
import { ApiPaginationQueryParams, getPaginatedRiders } from '../api';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { Rider } from '../models';
import AppTextField from '../components/AppForm/AppTextField';
import AppTableActionButtons from '../components/AppTableActionButtons';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppButton from '../components/AppButton';
import { useDebouncedState } from '../utils/useDebouncedStateHook';

export type ExtraColumnDefinition = {
    header: string,
    renderRow: (value: Rider.Summary) => JSX.Element,
}

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
    extraColumns?: ExtraColumnDefinition[],
    actionHeaderButtons?: JSX.Element[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
    extraColumns = [],
    actionHeaderButtons = [],
}) => {
    const {
        instantState: nameFilterValue,
        debouncedState: nameFilterDebounced,
        setState: handleNameFilterChange,
        instantReset: handleClearNameFilter,
    } = useDebouncedState('');
    
    const doGetPaginatedRiders = useCallback((queryParams: ApiPaginationQueryParams) =>
        getPaginatedRiders({
            ...queryParams,
            nameFilter: nameFilterDebounced
        }), [nameFilterDebounced]);
    
    const extraColumnHeaders = extraColumns.map(_ => _.header);
    const columnHeaders = ['ID', 'First Name', 'Last Name'].concat(extraColumnHeaders);

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
                {actionHeaderButtons}
            </AppTableActionButtons>
            <PaginatedApiTable
                makeRequest={doGetPaginatedRiders}
                headers={columnHeaders}
                renderRowCell={rider => (
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
                noEntitiesMessage={nameFilterValue ?
                    `No riders match the filter '${nameFilterValue}'.` :
                    'You don\'t have any riders yet.'
                }
            />
        </div>
    );
};

export default RidersTable;