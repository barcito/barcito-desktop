import MainCard from "@/components/MainCard";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Switch, Button, InputAdornment } from "@mui/material";
import AnimateButton from "@/components/AnimateButton";
import compareObjects from '@/utils/compareObjects';

export default function SupplyForm({ supply, mutation, handleNew }){

    const initialValues = supply ? supply : {
        description: "",
        available: "",
        buyPrice: "",
        stock: "",
        lowStockWarning: "",
        lastRestock: "",
    }

    return(
        <MainCard>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    description: Yup.string().max(255).required("La descripción es obligatoria"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (supply?.id) {
                            const editSupply = compareObjects(initialValues, values);
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
                                        <OutlinedInput id="description-item" type="description" value={values.description} name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar descripcion" fullWidth error={Boolean(touched.description && errors.description)} />
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
                                        <Switch id="available-item" checked={values.available} value={values.available} name="available" onBlur={handleBlur} onChange={handleChange} /* error={Boolean(touched.available && errors.available)} */ />
                                        {/* {touched.available && errors.available && (
                                                <FormHelperText error id="standard-weight-helper-text-available-item">
                                                    {errors.available}
                                                </FormHelperText>
                                            )} */}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="stock-item">Stock</InputLabel>
                                        <OutlinedInput id="stock-item" value={values.stock} type='number' name="stock" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar stock" fullWidth error={Boolean(touched.stock && errors.stock)} />
                                        {touched.stock && errors.stock && (
                                            <FormHelperText error id="standard-weight-helper-text-stock-item">
                                                {errors.stock}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lowStockWarning-item">Bajo stock</InputLabel>
                                        <OutlinedInput id="lowStockWarning-item" type='number' value={values.lowStockWarning} name="lowStockWarning" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar lowStockWarning" fullWidth error={Boolean(touched.lowStockWarning && errors.lowStockWarning)} />
                                        {touched.lowStockWarning && errors.lowStockWarning && (
                                            <FormHelperText error id="standard-weight-helper-text-lowStockWarning-item">
                                                {errors.lowStockWarning}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={4}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lastRestock-item">Ultima compra stock</InputLabel>
                                        <OutlinedInput id="lastRestock-item" value={values.lastRestock} type='date' name="lastRestock" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar lastRestock" fullWidth error={Boolean(touched.lastRestock && errors.lastRestock)} />
                                        {touched.lastRestock && errors.lastRestock && (
                                            <FormHelperText error id="standard-weight-helper-text-lastRestock-item">
                                                {errors.lastRestock}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="buyPrice-item">Costo</InputLabel>
                                        <OutlinedInput id="buyPrice-item" value={values.buyPrice} type='number' name="buyPrice" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar costo" fullWidth error={Boolean(touched.buyPrice && errors.buyPrice)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                                        {touched.buyPrice && errors.buyPrice && (
                                            <FormHelperText error id="standard-weight-helper-text-buyPrice-item">
                                                {errors.buyPrice}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid item xs={2}>
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