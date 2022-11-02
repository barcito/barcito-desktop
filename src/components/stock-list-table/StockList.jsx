import { filter } from "lodash";
import { useState } from "react";
import { Table, Stack, Checkbox, TableRow, TableBody, TableCell, Typography, TableContainer, TablePagination, IconButton, Tooltip, Chip } from "@mui/material";
import MainCard from "../MainCard";
import StockListHead from "./StockListHead";
import SearchNotFound from "../user-list-table/SearchNotFound";
import StockListToolbar from "./StockListToolbar";
import { OpenInNew } from "@mui/icons-material";

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
        return filter(array, (_item) => _item.description.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function StockList({ stockList, tableHead, handleNew, handleEdit }) {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = stockList.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stockList.length) : 0;

    const filteredItems = applySortFilter(stockList, getComparator(order, orderBy), filterName);

    const isItemNotFound = filteredItems.length === 0;

    return (
        <MainCard>
            <StockListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} handleNew={handleNew} />
            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <StockListHead order={order} orderBy={orderBy} headLabel={tableHead} rowCount={stockList.length} numSelected={selected.length} onRequestSort={handleRequestSort} onSelectAllClick={handleSelectAllClick} />
                    <TableBody>
                        {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const {
                                id,
                                description,
                                stock,
                                finalSellPrice,
                                associatedSellPrice,
                                productToSupplies,
                                categories
                            } = row;
                            const isItemSelected = selected.indexOf(id) !== -1;
                            return (
                                <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isItemSelected} aria-checked={isItemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                                    </TableCell>

                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography variant="subtitle2" noWrap>
                                                {description}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell align="center">${stock.cost}</TableCell>

                                    <TableCell align="center">{stock.quantity}</TableCell>

                                    { finalSellPrice && <TableCell align="center">${finalSellPrice}</TableCell>}

                                    { associatedSellPrice && <TableCell align="center">${associatedSellPrice}</TableCell>}

                                    <TableCell align="center">{productToSupplies ? productToSupplies.length : 0}</TableCell>

                                    { categories && <TableCell align="center">
                                            {categories.map((category) => {
                                                return <Chip key={category.id} variant="outlined" color="primary" size="small" label={category.description} sx={{ mx: 0.25 }} />;
                                            })}
                                        </TableCell>
                                    }
                                    
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={ () => handleEdit(id)}>
                                                <OpenInNew />
                                            </IconButton>
                                        </Tooltip>
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
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={stockList.length} rowsPerPage={rowsPerPage} labelRowsPerPage="Filas por página" page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </MainCard>
    );
}