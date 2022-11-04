import React from "react";
import MainCard from "@/components/MainCard";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from 'yup';
import { FormHelperText, Grid, InputLabel, Stack, OutlinedInput, Typography, IconButton, InputAdornment, Button } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import MultiSelect from "@/components/MultiSelect";
import AnimateButton from "@/components/AnimateButton";

export default function ReceiptForm({ receipt, mutation, handleNew, prods, supps }){

    const multiProducts = prods.map( (prod) => ({ id: prod.stock.id, description: prod.description }));
    const multiSupplies = supps.map( (supp) => ({ id: supp.stock.id, description: supp.description }));

    const initialValues = receipt ?
    {
        ...receipt,
        receiptToStock: receipt.receiptToStock.map( rts => rts.stockId)
    }
    :
    {
        date: "",
        ticket: "",
        amount: "",
        receiptPath: null,
        products: [],
        supplies: []
    }

    return(
        <MainCard>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    date: Yup.string().max(255).required("La fecha es obligatoria"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const newReceipt = {
                            ...values,
                            receiptToStock: values.products.concat(values.supplies)
                        };
                        delete newReceipt.products;
                        delete newReceipt.supplies;
                        handleNew({ receipt: newReceipt });
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err) {
                        console.log(err)
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="date-receipt">Fecha</InputLabel>
                                    <OutlinedInput id="date-receipt" type="date" value={values.date} name="date" onBlur={handleBlur} onChange={handleChange} placeholder="Ingrese fecha" fullWidth error={Boolean(touched.date && errors.date)} />
                                    {touched.date && errors.date && (
                                        <FormHelperText error id="helper-text-date-receipt">
                                            {errors.date}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="ticket-receipt">Nro de Recibo</InputLabel>
                                    <OutlinedInput id="ticket-receipt" type="text" value={values.ticket} name="ticket" onBlur={handleBlur} onChange={handleChange} placeholder="Ingrese número de recibo" fullWidth error={Boolean(touched.ticket && errors.ticket)} />
                                    {touched.ticket && errors.ticket && (
                                        <FormHelperText error id="helper-text-ticket-receipt">
                                            {errors.ticket}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="amount-receipt">Monto</InputLabel>
                                    <OutlinedInput id="amount-receipt" type="number" value={values.amount} name="amount" onBlur={handleBlur} onChange={handleChange} placeholder="Ingrese monto" fullWidth error={Boolean(touched.amount && errors.amount)} startAdornment={<InputAdornment position="end">$</InputAdornment>} />
                                    {touched.amount && errors.amount && (
                                        <FormHelperText error id="helper-text-amount-receipt">
                                            {errors.amount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="receiptPath">Documento</InputLabel>
                                    <input id="receiptPath" name="receiptPath" type="file" onChange={(event) => {
                                        setFieldValue("receiptPath", event.currentTarget.files[0]);
                                    }} />
                                    {/*touched.amount && errors.amount && (
                                        <FormHelperText error id="helper-text-amount-receipt">
                                            {errors.amount}
                                        </FormHelperText>
                                    )*/}
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant='h5'>Agregar productos</Typography>
                                    <IconButton color="primary" onClick={
                                        () => {
                                            setFieldValue('products', [...values.products, {stockId: "", quantity: "", totalCost: ""}])
                                        }}>
                                        <AddBox fontSize="large"/>
                                    </IconButton>
                                    <IconButton color="primary" onClick={
                                        () => {
                                            values.products.pop();
                                            setFieldValue('products', values.products);
                                        }}>
                                        <IndeterminateCheckBox fontSize="large"/>
                                    </IconButton>
                                </Stack>
                                
                                <Grid container spacing={2}>
                                    <FieldArray name="products">
                                    {() => (values.products.map((prod, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <Grid item xs={5}>
                                                    <Field
                                                        id={`products-item-${prod.id}`}
                                                        name={`products.${i}.stockId`}
                                                        options={multiProducts}
                                                        component={MultiSelect}
                                                        placeholder="Seleccione producto"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <OutlinedInput id={`product-${prod.id}-quantity`} value={values.products[i].quantity} type='number' name={`products.${i}.quantity`} onBlur={handleBlur} onChange={handleChange} placeholder="Cantidad" fullWidth error={Boolean(touched.discount && errors.discount)} startAdornment={<InputAdornment position="end">x</InputAdornment>} />
                                                    {/* {touched.discount && errors.discount && (
                                                        <FormHelperText error id="standard-weight-helper-text-discount-item">
                                                            {errors.discount}
                                                        </FormHelperText>
                                                    )} */}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <OutlinedInput id={`product-${prod.id}-totalCost`} value={values.products[i].totalCost} type='number' name={`products.${i}.totalCost`} onBlur={handleBlur} onChange={handleChange} placeholder="Monto total" fullWidth error={Boolean(touched.discount && errors.discount)} startAdornment={<InputAdornment position="end">$</InputAdornment>} />
                                                    {/* {touched.discount && errors.discount && (
                                                        <FormHelperText error id="standard-weight-helper-text-discount-item">
                                                            {errors.discount}
                                                        </FormHelperText>
                                                    )} */}
                                                </Grid>
                                            </React.Fragment>
                                            )
                                        }
                                    ))}
                                    </FieldArray>
                                </Grid>

                            </Grid>

                            <Grid item xs={6}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant='h5'>Agregar insumos</Typography>
                                    <IconButton color="primary" onClick={
                                        () => {
                                            setFieldValue('supplies', [...values.supplies, {stockId: "", quantity: "", totalCost: ""}])
                                        }}>
                                        <AddBox fontSize="large"/>
                                    </IconButton>
                                    <IconButton color="primary" onClick={
                                        () => {
                                            values.supplies.pop();
                                            setFieldValue('supplies', values.supplies);
                                        }}>
                                        <IndeterminateCheckBox fontSize="large"/>
                                    </IconButton>
                                </Stack>
                                
                                <Grid container spacing={2}>
                                    <FieldArray name="supplies">
                                    {() => (values.supplies.map((supp, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <Grid item xs={5}>
                                                    <Field
                                                        id={`supplies-item-${supp.id}`}
                                                        name={`supplies.${i}.stockId`}
                                                        options={multiSupplies}
                                                        component={MultiSelect}
                                                        placeholder="Seleccione insumo"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <OutlinedInput id={`supply-${supp.id}-quantity`} value={values.supplies[i].quantity} type='number' name={`supplies.${i}.quantity`} onBlur={handleBlur} onChange={handleChange} placeholder="Cantidad" fullWidth error={Boolean(touched.discount && errors.discount)} startAdornment={<InputAdornment position="end">x</InputAdornment>} />
                                                    {/* {touched.discount && errors.discount && (
                                                        <FormHelperText error id="standard-weight-helper-text-discount-item">
                                                            {errors.discount}
                                                        </FormHelperText>
                                                    )} */}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <OutlinedInput id={`supply-${supp.id}-totalCost`} value={values.supplies[i].totalCost} type='number' name={`supplies.${i}.totalCost`} onBlur={handleBlur} onChange={handleChange} placeholder="Monto total" fullWidth error={Boolean(touched.discount && errors.discount)} startAdornment={<InputAdornment position="end">$</InputAdornment>} />
                                                    {/* {touched.discount && errors.discount && (
                                                        <FormHelperText error id="standard-weight-helper-text-discount-item">
                                                            {errors.discount}
                                                        </FormHelperText>
                                                    )} */}
                                                </Grid>
                                            </React.Fragment>
                                            )
                                        }
                                    ))}
                                    </FieldArray>
                                </Grid>

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
    )
}