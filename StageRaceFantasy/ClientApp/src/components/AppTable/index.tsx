import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Paper, makeStyles, IconButton } from '@material-ui/core';
import React from 'react';
import { ChangeEvent } from 'react';
import { Pagination } from '../../models/pagination';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    },
    table: {

    },
    tableContainer: {
        boxShadow: 'none'
    }
}));

export interface TableActionButtonDefinition {
    icon: JSX.Element,
    onClick: (id: number) => void,
}

export type AppTableProps<TRow> = {
    headers: string[],
    entities: TRow[],
    renderRowCells: (entity: TRow) => JSX.Element,
    pagination?: Pagination,
    pageSizeOptions?: number[],
    onChangePageNumber?: (pageNumber: number) => void,
    onChangePageSize?: (pageSize: number) => void,
    noEntitiesMessage: string,
    actionButtons?: TableActionButtonDefinition[],
}

const AppTable = <TRow extends { id: number },>({
    headers,
    entities,
    renderRowCells,
    pagination,
    pageSizeOptions = [10, 25, 100],
    onChangePageNumber,
    onChangePageSize,
    noEntitiesMessage,
    actionButtons = [],
}: AppTableProps<TRow>): JSX.Element => {
    const classes = useStyles();

    if (pagination) {
        if (!onChangePageNumber || !onChangePageSize) {
            console.warn('AppTable: For pagination to work you must provide page number and size change handlers.');
        }
    }

    const handleChangePageNumber = (_: unknown, pageNumber: number) => {
        onChangePageNumber && onChangePageNumber(pageNumber + 1);
    };

    const handleChangePageSize = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const pageSize = parseInt(event.target.value);
        onChangePageSize && onChangePageSize(pageSize);
    };

    if (entities.length === 0) {
        return (
            <Typography>{noEntitiesMessage}</Typography>
        );
    }

    const _headers = actionButtons.length > 0 ? [...headers, ''] : headers;

    return (
        <>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {_headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map(entity => (
                            <TableRow key={entity.id}>
                                {renderRowCells(entity)}
                                {actionButtons.length > 0 && (
                                    <TableCell width={48 * actionButtons.length}>
                                        {actionButtons.map(({ onClick, icon }, index) => (
                                            <IconButton
                                                key={index}
                                                onClick={() => onClick(entity.id)}>
                                                {icon}
                                            </IconButton>
                                        ))}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    className={classes.pagination}
                    component="div"
                    rowsPerPageOptions={pageSizeOptions}
                    count={pagination.totalCount}
                    rowsPerPage={pagination.pageSize}
                    page={pagination.pageNumber - 1}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePageNumber}
                    onChangeRowsPerPage={handleChangePageSize}
                />

            )}
        </>
    );
};

export default AppTable;