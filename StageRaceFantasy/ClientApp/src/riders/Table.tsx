import React from 'react';
import { TableCell } from '@material-ui/core';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { Rider } from '../models';
import AppTextField from '../components/AppForm/AppTextField';
import AppTableActionButtons from '../components/AppTableActionButtons';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppButton from '../components/AppButton';
import { useGetPaginatedRiders } from './useGetPaginatedRiders';
import { getPaginatedRiders } from '../api';

export type ExtraColumnDefinition = {
    header: string,
    renderRow: (value: Rider.Summary) => JSX.Element,
}

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
    extraColumns?: ExtraColumnDefinition[],
    actionHeaderButtons?: JSX.Element[],
    getPaginatedRidersRequest?: typeof getPaginatedRiders,
    pageSizeOptions?: number[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
    extraColumns = [],
    actionHeaderButtons = [],
    getPaginatedRidersRequest,
    pageSizeOptions,
}) => {
    const extraColumnHeaders = extraColumns.map(_ => _.header);
    const columnHeaders = ['ID', 'First Name', 'Last Name'].concat(extraColumnHeaders);

    const {
        getRidersRequest,
        nameFilterValue,
        setNameFilter,
        clearNameFilter,
    } = useGetPaginatedRiders(getPaginatedRidersRequest);

    return (
        <div>
            <AppTableActionButtons>
                <AppTextField
                    label="Filter by name"
                    value={nameFilterValue}
                    onChange={event => setNameFilter(event.target.value)}
                    fullWidth={false}
                />
                <AppButton
                    variant="text"
                    disabled={!nameFilterValue}
                    onClick={clearNameFilter}
                >
                    Clear
                </AppButton>
                <AppFlexSpacer />
                {actionHeaderButtons}
            </AppTableActionButtons>
            <PaginatedApiTable
                makeRequest={getRidersRequest}
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
                pageSizeOptions={pageSizeOptions}
            />
        </div>
    );
};

export default RidersTable;