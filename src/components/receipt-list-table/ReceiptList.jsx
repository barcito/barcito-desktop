import { filter } from "lodash";
import { useState } from "react";
import { Table, TableRow, TableBody, TableCell, TableContainer, TablePagination, Link, Chip } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import MainCard from "../MainCard";
import ReceiptListToolbar from "./ReceiptListToolbar";
import ReceiptListHead from "./ReceiptListHead";
import SearchNotFound from "../user-list-table/SearchNotFound";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_item) => _item.ticket.indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function ReceiptList({ receiptList, tableHead, handleNew }) {

    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("desc");

    const [orderBy, setOrderBy] = useState("createdAt");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - receiptList.length) : 0;

    const filteredItems = applySortFilter(receiptList, getComparator(order, orderBy), filterName);

    const isItemNotFound = filteredItems.length === 0;

    return (
        <MainCard>
            <ReceiptListToolbar filterName={filterName} onFilterName={handleFilterByName} handleNew={handleNew} />
            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <ReceiptListHead order={order} orderBy={orderBy} headLabel={tableHead} rowCount={receiptList.length} onRequestSort={handleRequestSort} />
                    <TableBody>
                        {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const {
                                id,
                                ticket,
                                date,
                                amount,
                                receiptPath,
                            } = row;
                            return (
                                <TableRow hover key={id} tabIndex={-1} role="checkbox">

                                    <TableCell component="th" scope="row" padding="none">
                                        <Link color="secondary" href={`/stock/recibos/${ticket}`}>
                                            {ticket}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">{new Date(date).toLocaleString()}</TableCell>

                                    <TableCell align="center">{amount}</TableCell>

                                    <TableCell align="center">
                                        <Link href={receiptPath || '#'} target="_blank" underline="none">
                                            <Chip variant="outlined" color="primary" label="Ver" icon={<Visibility />} sx={{ cursor: "pointer" }} />
                                        </Link>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={tableHead.length + 2} />
                            </TableRow>
                        )}
                    </TableBody>
                    {isItemNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={tableHead.length + 2} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={receiptList.length} rowsPerPage={rowsPerPage} labelRowsPerPage="Filas por página" page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </MainCard>
    );
}