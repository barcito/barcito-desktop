import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export default function ManagersTable({ managers, setManagers }){

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Nombre Completo</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {managers.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align='center' component="th" scope="row">
                            {`${row.name} ${row.surname}`}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.roles}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}