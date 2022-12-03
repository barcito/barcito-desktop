import MainCard from "@/components/MainCard";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Button, InputAdornment, Select, MenuItem } from "@mui/material";
import AnimateButton from "@/components/AnimateButton";
import compareObjects from "@/utils/compareObjects";
import MultiSelect from "@/components/MultiSelect";
import { useQuery } from "react-query";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function StockForm({ stock, mutation, handleNew }) {
  const { data: categories, isLoading } = useQuery(["categories"], async () => CategoriesAPI.getAll());

  const initialValues = stock
    ? {
        ...stock,
        categories: stock.categories.map((cat) => cat.id),
      }
    : {
        type: "",
        description: "",
        cost: "",
        quantity: "",
        warning: "",
        categories: [],
      };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainCard sx={{ width: "75%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          type: Yup.mixed().oneOf(["Consumible", "Insumo"]).required("Debe seleccionar una categoría"),
          cost: Yup.number().required("Debe ingresar un costo"),
          quantity: Yup.number().required("Debe ingresar una cantidad"),
          warning: Yup.number().required("Debe ingresar un nivel de alerta"),
          description: Yup.string().max(255).required("La descripción es obligatoria"),
          categories: Yup.array().of(Yup.number()).min(1, "Debe seleccionar al menos una categoría"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (stock?.id) {
              const editStock = compareObjects(initialValues, values);
              if (editStock.categories) {
                editStock.categories = editStock.categories.map((id) => ({ id }));
              }
              mutation.mutate({ id: stock.id, stock: editStock });
            } else {
              handleNew({ ...values, categories: values.categories.map((id) => ({ id })) });
            }
            setStatus({ success: true });
            setSubmitting(false);
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
                  <InputLabel htmlFor="description-item">Descripcion</InputLabel>
                  <OutlinedInput id="description-item" type="text" value={values.description} name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar descripcion" fullWidth error={Boolean(touched.description && errors.description)} />
                  {touched.description && errors.description && (
                    <FormHelperText error id="standard-weight-helper-text-description-item">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <InputLabel id="type-item">Tipo</InputLabel>
                  <Select id="type-item" name="type" value={values.type} placeholder="Seleccione tipo" onChange={handleChange}>
                    <MenuItem value="Consumible">Consumible</MenuItem>
                    <MenuItem value="Insumo">Insumo</MenuItem>
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error id="standard-weight-helper-text-type-item">
                      {errors.type}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cost-item">Costo</InputLabel>
                  <OutlinedInput id="cost-item" value={values.cost} type="number" name="cost" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar costo" fullWidth error={Boolean(touched.cost && errors.cost)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                  {touched.cost && errors.cost && (
                    <FormHelperText error id="standard-weight-helper-text-cost-item">
                      {errors.cost}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="quantity-item">Cantidad</InputLabel>
                  <OutlinedInput id="quantity-item" value={values.quantity} type="number" name="quantity" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar cantidad" fullWidth error={Boolean(touched.quantity && errors.quantity)} />
                  {touched.quantity && errors.quantity && (
                    <FormHelperText error id="standard-weight-helper-text-quantity-item">
                      {errors.quantity}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="warning-item">Advertencia</InputLabel>
                  <OutlinedInput id="warning-item" type="number" value={values.warning} name="warning" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar advertencia" fullWidth error={Boolean(touched.warning && errors.warning)} />
                  {touched.warning && errors.warning && (
                    <FormHelperText error id="standard-weight-helper-text-warning-item">
                      {errors.warning}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="categories" id="categories">
                    Categorias
                  </InputLabel>
                  <Select id={"categories"} name={"categories"} multiple value={values.categories} onBlur={handleBlur} onChange={handleChange} MenuProps={MenuProps}>
                    {categories
                      .filter((cat) => cat.type === values.type)
                      .map((category, index) => (
                        <MenuItem key={index} value={category.id}>
                          {category.description}
                        </MenuItem>
                      ))}
                  </Select>
                  {touched.categories && errors.categories && (
                    <FormHelperText error id="standard-weight-helper-text-categories">
                      {errors.categories}
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
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
