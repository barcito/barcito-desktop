import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Tooltip, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoriesAPI } from '@/services/categoriesAPI';
import UserMoreMenu from '@/components/user-list-table/UserMoreMenu';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import CategoryDialog from './CategoryDialog';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useState } from 'react';

export default function CategoriesList(){

    const client = useQueryClient();
    const {data: categories, isLoading} = useQuery(['categories'], () => CategoriesAPI.getAll());

    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [category, setCategory] = useState({description: ""});

    const mutation = useMutation(
        (cat) => {
            if(cat.id){
                return CategoriesAPI.update(cat.id, {description: cat.description});    
            }
            return CategoriesAPI.create(cat);
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['categories']);
            }
        }
    );

    const deleteMutation = useMutation(
        (id) => {
            return CategoriesAPI.delete(id);
        },
        {
            onSuccess: () => {
                setConfirmDialogOpen(false);
                client.invalidateQueries(['categories']);
            }
        }
    )

    if(isLoading){
        return <p>Loading...</p>;
    }

    return(
        <>
            <Container sx={{pt: 4}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Nombre</TableCell>
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
                                        fn: () => {setCategory(row); setCategoryDialogOpen(true)}
                                    }}
                                    actionTwo={{
                                        label: "Eliminar",
                                        icon: <DeleteIcon width={24} height={24} />,
                                        fn: () => {setCategory(row); setConfirmDialogOpen(true)}
                                    }}
                                />
                                </TableCell>
                            </TableRow>
                        ))}
                            <TableRow>
                                <TableCell colSpan={2} align='center'>
                                    <Tooltip title="Nueva Categoria">
                                        <IconButton color="primary" onClick={() => {setCategory({description: ""}); setCategoryDialogOpen(true)}}>
                                            <LibraryAdd fontSize="large"/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <CategoryDialog category={category} dialogOpen={categoryDialogOpen} mutation={mutation} setDialogOpen={setCategoryDialogOpen} />
            <ConfirmDialog dialogOpen={confirmDialogOpen} text={"¿Eliminar categoría?"} confirmAction={() => deleteMutation.mutate(category.id) } closeDialog={setConfirmDialogOpen} />
        </>
    );
}