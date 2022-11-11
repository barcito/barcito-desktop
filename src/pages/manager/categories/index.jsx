import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Tooltip, IconButton, Box, Tab } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoriesAPI } from '@/services/categoriesAPI';
import UserMoreMenu from '@/components/user-list-table/UserMoreMenu';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import CategoryDialog from './CategoryDialog';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useState } from 'react';
import { TabContext, TabList } from '@mui/lab';

export default function CategoriesList(){

    const client = useQueryClient();
    const {data: categories, isLoading} = useQuery(['categories'], () => CategoriesAPI.getAll());

    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [category, setCategory] = useState({description: "", type: ""});
    const [value, setValue] = useState("All");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const mutation = useMutation(
        (cat) => {
            if(cat.id){
                return CategoriesAPI.update(cat.id, {description: cat.description, type: cat.type});    
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

    const tabbedCategories = value === "All" || !categories ? categories : categories.filter( (category) => category.type === value );

    return(
        <>
            <Container sx={{pt: 4}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="categories tabs">
                            <Tab label="Todas" value="All" />
                            <Tab label="Consumibles" value="Consumible" />
                            <Tab label="Insumos" value="Insumo" />
                            <Tab label="Productos" value="Producto" />
                        </TabList>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Nombre</TableCell>
                                    <TableCell align='center'>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {tabbedCategories.map((row) => (
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
                                            <IconButton color="primary" onClick={() => {setCategory({description: "", type: ""}); setCategoryDialogOpen(true)}}>
                                                <LibraryAdd fontSize="large"/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabContext>
            </Container>

            <CategoryDialog category={category} dialogOpen={categoryDialogOpen} mutation={mutation} setDialogOpen={setCategoryDialogOpen} />
            <ConfirmDialog dialogOpen={confirmDialogOpen} text={"¿Eliminar categoría?"} confirmAction={() => deleteMutation.mutate(category.id) } closeDialog={setConfirmDialogOpen} />
        </>
    );
}