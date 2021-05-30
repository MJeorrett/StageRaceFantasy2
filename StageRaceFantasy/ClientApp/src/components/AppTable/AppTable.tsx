import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Paper, makeStyles, IconButton } from '@material-ui/core';
import React from 'react';
import { ChangeEvent } from 'react';
import { ApiPagination } from '../../api';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    },
    noItemsMessage: {
        marginTop: theme.spacing(4),
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
    renderRowCell: (entity: TRow) => JSX.Element,
    pagination?: ApiPagination & {
        setPageNumber: (pageNumber: number) => void
        setPageSize: (pageSize: number) => void
    },
    pageSizeOptions?: number[],
    noEntitiesMessage: string,
    actionButtons?: TableActionButtonDefinition[],
}

const AppTable = <TRow extends { id: number },>({
    headers,
    entities,
    renderRowCell,
    pagination,
    pageSizeOptions = [10, 25, 100],
    noEntitiesMessage,
    actionButtons = [],
}: AppTableProps<TRow>): JSX.Element => {
    const classNames = useStyles();

    const handleChangePageNumber = (_: unknown, pageNumber: number) => {
        pagination?.setPageNumber(pageNumber + 1);
    };

    const handleChangePageSize = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const pageSize = parseInt(event.target.value);
        pagination?.setPageSize(pageSize);
    };

    if (entities.length === 0) {
        return (
            <Typography
                className={classNames.noItemsMessage}
                align="center"
            >
                {noEntitiesMessage}
            </Typography>
        );
    }

    const _headers = actionButtons.length > 0 ? [...headers, ''] : headers;

    return (
        <>
            <TableContainer className={classNames.tableContainer} component={Paper}>
                <Table>
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
                                {renderRowCell(entity)}
                                {actionButtons.length > 0 && (
                                    <TableCell>
                                        <div>
                                            {actionButtons.map(({ onClick, icon }, index) => (
                                                <IconButton
                                                    key={index}
                                                    onClick={() => onClick(entity.id)}>
                                                    {icon}
                                                </IconButton>
                                            ))}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    className={classNames.pagination}
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