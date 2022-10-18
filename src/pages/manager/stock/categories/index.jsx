import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useQuery } from 'react-query';
import { CategoriesAPI } from '@/services/categoriesAPI';
import UserMoreMenu from '@/components/user-list-table/UserMoreMenu';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CategoriesList(){

    const {data: categories, isLoading} = useQuery(['categories'], () => CategoriesAPI.getAll());

    if(isLoading){
        return <p>Loading...</p>;
    }

    return(
        <Container sx={{pt: 4}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Descripción</TableCell>
                            <TableCell align='center'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center' component="th" scope="row">
                                {row.description}
                            </TableCell>
                            <TableCell align='center'>
                            <UserMoreMenu
                                disabled={ false }
                                user={row}
                                actionOne={{
                                    label: "Editar",
                                    icon: <EditIcon width={24} height={24} />,
                                    fn: () => {console.log('hi')}
                                }}
                                actionTwo={{
                                    label: "Eliminar",
                                    icon: <DeleteIcon width={24} height={24} />,
                                    fn: () => {console.log('hi')}
                                }}
                            />
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}