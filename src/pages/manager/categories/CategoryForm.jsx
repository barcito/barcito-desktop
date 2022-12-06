import MainCard from "@/components/MainCard";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Button, InputAdornment, Select, MenuItem } from "@mui/material";
import AnimateButton from "@/components/AnimateButton";
import compareObjects from "@/utils/compareObjects";
import MultiSelect from "@/components/MultiSelect";
import { useQuery } from "react-query";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function CategoryForm({ stock, mutation, handleNew }) {
  const { data: categories, isLoading } = useQuery(["categories"], async () => CategoriesAPI.getAll());

  const initialValues = editData.id
    ? {
        type: editData.type,
        description: editData.description,
      }
    : {
        type: "",
        description: "",
      };

  //   const ITEM_HEIGHT = 48;
  //   const ITEM_PADDING_TOP = 8;
  //   const MenuProps = {
  //     PaperProps: {
  //       style: {
  //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //         width: 250,
  //       },
  //     },
  //   };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainCard sx={{ width: "75%" }}>
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
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Stack spacing={1}>
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
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <InputLabel id="type-item">Tipo</InputLabel>
                  <OutlinedInput id="description" type="text" value={values.description} name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar descripcion" fullWidth error={Boolean(touched.description && errors.description)} />
                  {touched.description && errors.description && (
                    <FormHelperText error id="standard-weight-helper-text-description-item">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={8}>
                <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  Crear
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
