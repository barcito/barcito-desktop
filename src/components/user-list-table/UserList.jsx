import { filter } from "lodash";
import { useState } from "react";
import { Table, Stack, Checkbox, TableRow, TableBody, TableCell, Typography, TableContainer, TablePagination, Chip, Link } from "@mui/material";
import MainCard from "../MainCard";
import Label from "../Label";
import UserListHead from "./UserListHead";
import SearchNotFound from "./SearchNotFound";
import UserListToolbar from "./UserListToolbar";
import UserMoreMenu from "./UserMoreMenu";
import AssociateListToolbar from "./AssociateListToolbar";
import { Visibility } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from "@mui/icons-material/Edit";
import PersonRemove from "@mui/icons-material/PersonRemove";

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
        return filter(array, (_user) => _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function UserList({ userList, tableHead, associateToolbar, handleNew, actionOne, actionTwo }) {

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
            const newSelecteds = userList.map((n) => n.id);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <MainCard>
            { associateToolbar ? 
                <AssociateListToolbar filterName={filterName} onFilterName={handleFilterByName} />
            :
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} handleNew={handleNew} handleDelete={actionTwo} />
            }
            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <UserListHead order={order} orderBy={orderBy} headLabel={tableHead} rowCount={userList.length} numSelected={selected.length} onRequestSort={handleRequestSort} onSelectAllClick={handleSelectAllClick} />
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { id, fullName, email, academicUnit, certificate, validated, phone, dni, roles } = row;
                            const isItemSelected = selected.indexOf(id) !== -1;
                            let validColor = "secondary";
                            if (validated === "Aceptado") validColor = "success";
                            if (validated === "Pendiente") validColor = "warning";
                            return (
                                <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isItemSelected} aria-checked={isItemSelected}>
                                    { roles && 
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                                        </TableCell>
                                    }
                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography variant="subtitle2" noWrap>
                                                {fullName}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{email}</TableCell>
                                    <TableCell align="left">{academicUnit}</TableCell>
                                    <TableCell align="left">
                                        {certificate ? (
                                            <Link href={certificate} target="_blank" underline="none">
                                                <Chip variant="outlined" color="primary" label="Ver" icon={<Visibility />} sx={{ cursor: "pointer" }} />
                                            </Link>
                                        ) : (
                                            "No posee"
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Label variant="ghost" color={validColor}>
                                            {validated || "No validado"}
                                        </Label>
                                    </TableCell>
                                    <TableCell align="left">{phone}</TableCell>
                                    <TableCell align="left">{dni}</TableCell>
                                        { roles && <TableCell align="left">
                                            {roles.map((rol) => {
                                                return <Chip key={rol} variant="outlined" color="primary" size="small" label={rol} sx={{ mx: 0.25 }} />;
                                            })}
                                        </TableCell>}
                                    <TableCell align="right">
                                        <UserMoreMenu
                                            user={row}
                                            actionOne={{
                                                label: associateToolbar ? "Validar" : "Editar",
                                                icon: associateToolbar ? <CheckIcon width={24} height={24} /> : <EditIcon width={24} height={24} />,
                                                fn: actionOne
                                            }}
                                            actionTwo={{
                                                label: associateToolbar ? "Rechazar" : "Eliminar",
                                                icon: associateToolbar ? <ClearIcon width={24} height={24} /> : <PersonRemove width={24} height={24} />,
                                                fn: actionTwo
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                { !associateToolbar && <TableCell />}
                                <TableCell colSpan={tableHead.length + 1} />
                            </TableRow>
                        )}
                    </TableBody>
                    {isUserNotFound && (
                        <TableBody>
                            <TableRow>
                                { !associateToolbar && <TableCell />}
                                <TableCell align="center" colSpan={tableHead.length + 1} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={userList.length} rowsPerPage={rowsPerPage} labelRowsPerPage="Filas por página" page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </MainCard>
    );
}