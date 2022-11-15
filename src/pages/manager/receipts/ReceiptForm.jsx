import React from "react";
import MainCard from "@/components/MainCard";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { FormHelperText, Grid, InputLabel, Stack, OutlinedInput, Typography, IconButton, InputAdornment, Button } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import MultiSelect from "@/components/MultiSelect";
import AnimateButton from "@/components/AnimateButton";
import { isArray } from "lodash";

export default function ReceiptForm({ receipt, mutation, handleNew, stockList }) {
  const initialValues = {
    date: "",
    ticket: "",
    amount: "",
    receipt_doc: null,
    receiptToStock: [],
  };

  let todaysDate = new Date();

  return (
    <MainCard>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          date: Yup.date().min(todaysDate, "La fecha no puede ser diferente al día de hoy").max(todaysDate, "La fecha no puede ser diferente al día de hoy").required("La fecha es obligatoria"),
          ticket: Yup.string().matches(/^\d+$/, "Este campo solo acepta números").min(8, "Número de recibo invalido").max(11, "Número de recibo invalido").required("El número de recibo es obligatorio"),
          amount: Yup.string().matches(/^\d+$/, "Este campo solo acepta números").min(1, "Monto invalido").required("El monto es obligatorio"),
          receiptToStock: Yup.array()
            .of(
              Yup.object().shape({
                stockId: Yup.number().required("Debe seleccionar un producto"),
                quantity: Yup.number().required("Debe cargar la cantidad"),
                totalCost: Yup.number().required("Debe cargar el costo"),
              })
            )
            .min(1, "Debe cargar al menos un item de stock"),
          receipt_doc: Yup.mixed().required("Se tiene que seleccionar un documento"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            handleNew(values);
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
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
                  <OutlinedInput
                    id="amount-receipt"
                    type="number"
                    value={values.amount}
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ingrese monto"
                    fullWidth
                    error={Boolean(touched.amount && errors.amount)}
                    startAdornment={<InputAdornment position="end">$</InputAdornment>}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText error id="helper-text-amount-receipt">
                      {errors.amount}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="receipt_doc">Documento</InputLabel>
                  <input
                    id="receipt_doc"
                    name="receipt_doc"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("receipt_doc", event.currentTarget.files[0]);
                    }}
                  />
                  {/*touched.amount && errors.amount && (
                                        <FormHelperText error id="helper-text-amount-receipt">
                                            {errors.amount}
                                        </FormHelperText>
                                    )*/}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5">Agregar productos</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setFieldValue("receiptToStock", [...values.receiptToStock, { stockId: "", quantity: "", totalCost: "" }]);
                    }}
                  >
                    <AddBox fontSize="large" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      values.receiptToStock.pop();
                      setFieldValue("receiptToStock", values.receiptToStock);
                    }}
                  >
                    <IndeterminateCheckBox fontSize="large" />
                  </IconButton>
                </Stack>
                {touched.receiptToStock && errors.receiptToStock && !isArray(errors.receiptToStock) && (
                  <FormHelperText error id="standard-weight-helper-text-stock-array-item">
                    {errors.receiptToStock}
                  </FormHelperText>
                )}
                <Grid container spacing={2}>
                  <FieldArray name="receiptToStock">
                    {() =>
                      values.receiptToStock.map((prod, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Grid item xs={5}>
                              <Stack spacing={1}>
                                <Field id={`receiptToStock-item-${prod.id}`} name={`receiptToStock.${i}.stockId`} options={stockList} component={MultiSelect} placeholder="Seleccione producto" />
                                {touched.receiptToStock && errors.receiptToStock && errors.receiptToStock[i]?.stockId && (
                                  <FormHelperText error id="standard-weight-helper-text-discount-item">
                                    {errors.receiptToStock[i]?.stockId}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                            <Grid item xs={3}>
                              <Stack spacing={1}>
                                <OutlinedInput
                                  id={`product-${prod.id}-quantity`}
                                  value={values.receiptToStock[i].quantity}
                                  type="number"
                                  name={`receiptToStock.${i}.quantity`}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Cantidad"
                                  fullWidth
                                  error={Boolean(errors.receiptToStock && touched.receiptToStock && errors.receiptToStock[i]?.quantity)}
                                  startAdornment={<InputAdornment position="end">x</InputAdornment>}
                                />
                                {touched.receiptToStock && errors.receiptToStock && errors.receiptToStock[i]?.quantity && (
                                  <FormHelperText error id="standard-weight-helper-text-discount-item">
                                    {errors.receiptToStock[i]?.quantity}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                            <Grid item xs={4}>
                              <Stack spacing={1}>
                                <OutlinedInput
                                  id={`product-${prod.id}-totalCost`}
                                  value={values.receiptToStock[i].totalCost}
                                  type="number"
                                  name={`receiptToStock.${i}.totalCost`}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Monto total"
                                  fullWidth
                                  error={Boolean(errors.receiptToStock && touched.receiptToStock && errors.receiptToStock[i]?.totalCost)}
                                  startAdornment={<InputAdornment position="end">$</InputAdornment>}
                                />
                                {touched.receiptToStock && errors.receiptToStock && errors.receiptToStock[i]?.totalCost && (
                                  <FormHelperText error id="standard-weight-helper-text-discount-item">
                                    {errors.receiptToStock[i]?.totalCost}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                          </React.Fragment>
                        );
                      })
                    }
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
  );
}
