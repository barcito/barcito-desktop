import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Slide, OutlinedInput, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Formik, useFormikContext, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryDialog({ editData, dialogOpen, mutation, setDialogOpen }) {
  const initialValues = editData.id
    ? {
        type: editData.type,
        description: editData.description,
      }
    : {
        type: "",
        description: "",
      };
  return (
    <Dialog open={dialogOpen} TransitionComponent={Transition} keepMounted onClose={() => setDialogOpen(false)} aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{editData.id ? "Modificar categoría" : "Crear categoría"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">Seleccione el tipo de categor&iacute;a</DialogContentText>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            type: Yup.mixed().oneOf(["Consumible", "Insumo", "Producto"]).required("Debe seleccionar una categoría"),
            description: Yup.string().max(255).required("Debe ingresar un nombre para la categoría"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            let type = values.type;
            let description = values.description;

            try {
              if (editData.id) {
                mutation.mutate({ id: editData.id, type, description });
              } else {
                mutation.mutate({ type, description });
              }
              setStatus({ success: true });
              setSubmitting(false);
              setDialogOpen(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <RadioGroup row aria-labelledby="type" name="type" value={values.type} onBlur={handleBlur} onChange={handleChange}>
                <FormControlLabel value="Consumible" control={<Radio />} label="Consumible" />
                <FormControlLabel value="Insumo" control={<Radio />} label="Insumo" />
                <FormControlLabel value="Producto" control={<Radio />} label="Producto" />
              </RadioGroup>
              {touched.type && errors.type && (
                <FormHelperText error id="standard-weight-helper-text-description-item">
                  {errors.type}
                </FormHelperText>
              )}

              <DialogContentText id="alert-dialog-slide-description" sx={{ mt: 3 }}>
                Ingrese el nombre
              </DialogContentText>
              <OutlinedInput id="description" type="text" value={values.description} name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar descripcion" fullWidth error={Boolean(touched.description && errors.description)} />
              {touched.description && errors.description && (
                <FormHelperText error id="standard-weight-helper-text-description-item">
                  {errors.description}
                </FormHelperText>
              )}

              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  Crear
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
