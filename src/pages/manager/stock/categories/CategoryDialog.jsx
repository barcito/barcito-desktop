import { forwardRef, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from '@mui/material';
import { useEffect } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryDialog({ category, dialogOpen, mutation, setDialogOpen }) {

    const [description, setDescription] = useState("");

    useEffect(()=>{
        setDescription(category.description);
    }, [category]);

    const handleSubmit = () => {
        mutation.mutate({id: category.id, description});
        setDialogOpen(false);
    }

    return (
        <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={ () => setDialogOpen(false) }
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{category ? "Crear categoría" : "Modificar categoría"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Ingrese el nombre de la categor&iacute;a
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onInput={(e) => setDescription(e.target.value) }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    );
}
