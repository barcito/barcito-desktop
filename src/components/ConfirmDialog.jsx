import { forwardRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ dialogOpen, text, confirmDelete, closeDialog }) {
    return (
        <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={ () => closeDialog(false) }
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Confirmar acción</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    { text }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => closeDialog(false) }>Cancelar</Button>
                <Button onClick={ () => confirmDelete() }>Aceptar</Button>
            </DialogActions>
        </Dialog>
    );
}
