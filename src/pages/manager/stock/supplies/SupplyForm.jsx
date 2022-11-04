import MainCard from "@/components/MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Switch, Button, InputAdornment } from "@mui/material";
import AnimateButton from "@/components/AnimateButton";
import compareObjects from '@/utils/compareObjects';

export default function SupplyForm({ supply, mutation, handleNew }){

    const initialValues = supply ?
    {
        ...supply,
        stock: {
            quantity: supply.stock.quantity,
            cost: supply.stock.cost,
            warning: supply.stock.warning
        }
    }
    :
    {
        description: "",
        available: false,
        stock: {
            quantity: "",
            cost: "",
            warning: "",
        }
    }

    return(
        <MainCard sx={{ width: '65%' }}>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    description: Yup.string().max(255).required("La descripción es obligatoria"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (supply?.id) {
                            const editSupply = compareObjects(initialValues, values);
                            if(editSupply.stock){
                                editSupply.stock.id = supply.stock.id;
                            }
                            mutation.mutate({ id: supply.id, supply: editSupply });
                        } else {
                            handleNew({ supply: values });
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
                                <Grid item xs={8}>
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

                                <Grid item xs={4}>
                                    <Stack spacing={1} alignItems='center'>
                                        <InputLabel htmlFor="available-item">Disponible</InputLabel>
                                        <Switch id="available-item" checked={values.available} value={values.available} name="available" onBlur={handleBlur} onChange={handleChange} />
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="stock-item">Stock</InputLabel>
                                        <OutlinedInput id="stock-item" value={values.stock.quantity} type='number' name="stock.quantity" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar stock" fullWidth error={Boolean(touched.quantity && errors.quantity)} />
                                        {touched.quantity && errors.quantity && (
                                            <FormHelperText error id="standard-weight-helper-text-stock-item">
                                                {errors.quantity}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="warning-item">Bajo stock</InputLabel>
                                        <OutlinedInput id="warning-item" type='number' value={values.stock.warning} name="stock.warning" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar warning" fullWidth error={Boolean(touched.warning && errors.warning)} />
                                        {touched.warning && errors.warning && (
                                            <FormHelperText error id="standard-weight-helper-text-warning-item">
                                                {errors.warning}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="cost-item">Costo</InputLabel>
                                        <OutlinedInput id="cost-item" value={values.stock.cost} type='number' name="stock.cost" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar costo" fullWidth error={Boolean(touched.cost && errors.cost)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                                        {touched.cost && errors.cost && (
                                            <FormHelperText error id="standard-weight-helper-text-cost-item">
                                                {errors.cost}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid item xs={4}>
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