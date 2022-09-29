import { filter } from 'lodash';
import { useState } from "react";
import {
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Chip,
    Link,
} from '@mui/material';
import MainCard from "../../../components/MainCard";
import Label from '../../../components/Label';
import UserListHead from './UserListHead';
import SearchNotFound from './SearchNotFound';
import UserListToolbar from './UserListToolbar';
import UserMoreMenu from './UserMoreMenu';
import { useEffect } from 'react';
import { UserAPI } from '../../../services/userAPI';
import ConfirmDialog from '../../../components/ConfirmDialog';
import UserEditModal from './UserEditModal';
import { Visibility } from '@mui/icons-material';

const TABLE_HEAD = [
    { id: 'fullName', label: 'Nombre completo', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'academicUnit', label: 'Unidad Academica', alignRight: false },
    { id: 'certificate', label: 'Certificado', alignRight: false },
    { id: 'validated', label: 'Validado', alignRight: false },
    { id: 'phone', label: 'Telefono', alignRight: false },
    { id: 'dni', label: 'DNI', alignRight: false },
    { id: 'roles', label: 'Roles', alignRight: false }
]

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
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

export default function User() {

    const [userList, setUserList] = useState([]);

    const [userOnAction, setUserOnAction] = useState(null)

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            const users = await UserAPI.getAll();
            const formattedUsers = users.map((user) => {
                return {
                    id: user.id,
                    fullName: `${user.surname} ${user.name}`,
                    email: user.email,
                    academicUnit: user.academicUnit,
                    certificate: user.applicationDone?.certificatePath || null,
                    validated: user.applicationDone?.status || null,
                    phone: user.phone,
                    dni: user.dni,
                    roles: Object.values(user.roles)
                }
            })
            setUserList(formattedUsers);
        }
        getUsers();
    }, [editUser]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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

    const handleNew = () => {
        setUserOnAction(null);
        setModalOpen(true);
    }

    const handleEdit = ( user ) => {
        setUserOnAction(user);
        setModalOpen(true)
    }

    const handleDelete = ( user ) => {
        setUserOnAction(user);
        setDialogOpen(true)
    }

    const confirmDelete = () => {
        const deleteUser = async (id) => {
            try{
                await UserAPI.delete(id);
                setUserList(
                    userList.filter( (user) => user.id !== id )
                );
                setSelected([]);
            }catch(err){
                console.log(err);
            }
        }
        if(selected){
            selected.map( (id)  => {
                deleteUser(id);
            });
        }
        if(userOnAction){
            deleteUser(userOnAction.id);
        }
        setDialogOpen(false);
    }

    return (
        <Container sx={{ pt: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h2" gutterBottom>
                    Usuarios
                </Typography>
                <Button variant="contained" onClick={() => handleNew()}>
                    Nuevo Usuario
                </Button>
            </Stack>
            <MainCard>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} handleDelete={handleDelete} />
                <TableContainer>

                    <Table sx={{ minWidth: 800 }}>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={userList.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { id, fullName, email, academicUnit, certificate, validated, phone, dni, roles } = row;
                                const isItemSelected = selected.indexOf(id) !== -1;
                                let validColor = 'error';
                                if( validated === 'Aceptado') validColor = 'success';
                                if( validated === 'Pendiente') validColor = 'warning';
                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        aria-checked={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="subtitle2" noWrap>
                                                    {fullName}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{academicUnit}</TableCell>
                                        <TableCell align="left">{
                                            certificate ?
                                                <Link href={certificate} target="_blank" underline='none'>
                                                    <Chip variant='outlined' color='primary' label="Ver" icon={<Visibility />} sx={{ cursor: 'pointer'}} />
                                                </Link>
                                                :
                                                'No posee'}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Label variant="ghost" color={validColor}>
                                                {validated || 'Sin realizar'}
                                            </Label>
                                        </TableCell>
                                        <TableCell align="left">{phone}</TableCell>
                                        <TableCell align="left">{dni}</TableCell>
                                        <TableCell align="left">{roles.map( (rol) => {
                                            return <Chip key={rol} variant='outlined' color='primary' size='small' label={rol} sx={{ mx: 0.25 }} />
                                        })}</TableCell>
                                        <TableCell align="right">
                                            <UserMoreMenu user={row} handleEdit={handleEdit} handleDelete={handleDelete}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {isUserNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterName} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario/s?"} confirmDelete={confirmDelete} closeDialog={setDialogOpen} />
            <UserEditModal user={userOnAction} modalOpen={modalOpen} closeModal={setModalOpen} setEditUser={setEditUser} />
        </Container>
    );
}