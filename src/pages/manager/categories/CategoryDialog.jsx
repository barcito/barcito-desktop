import { forwardRef, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useEffect } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryDialog({ category, dialogOpen, mutation, setDialogOpen }) {

    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    useEffect(()=>{
        setDescription(category.description);
        setType(category.type);
    }, [category]);

    const handleSubmit = () => {
        mutation.mutate({id: category.id, description, type});
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
            <DialogTitle>{category ? "Modificar categoría" : "Crear categoría"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Seleccione el tipo de categor&iacute;a
                </DialogContentText>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <FormControlLabel value="Consumible" control={<Radio />} label="Consumible" />
                    <FormControlLabel value="Insumo" control={<Radio />} label="Insumo" />
                    <FormControlLabel value="Producto" control={<Radio />} label="Producto" />
                </RadioGroup>
                <DialogContentText id="alert-dialog-slide-description" sx={{ mt: 3 }}>
                    Ingrese el nombre
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
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
