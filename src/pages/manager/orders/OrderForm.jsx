import React from "react";
import MainCard from "@/components/MainCard";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { FormHelperText, Grid, InputLabel, Stack, OutlinedInput, Typography, IconButton, InputAdornment, Button, Select, MenuItem } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import MultiSelect from "@/components/MultiSelect";
import AnimateButton from "@/components/AnimateButton";

export default function OrderForm({ handleNew, prods, users }) {
  const multiProducts = prods.map((prod) => ({ id: prod.id, description: prod.description }));
  const multiUsers = users.map((user) => ({ id: user.id, description: user.email }));

  const initialValues = {
    user: "",
    products: [{ id: "", quantity: "" }],
  };

  return (
    <MainCard sx={{ width: "75%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          user: Yup.number().required("Debe seleccionar un usuario"),
          products: Yup.array().of(
            Yup.object().shape({
              id: Yup.number().required("Debe seleccionar un producto"),
              quantity: Yup.number().required("Debe cargar la cantidad"),
            })
          ),
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="user">Cliente</InputLabel>
                  {/* <Field id="user-order" name="user-order" options={multiUsers} component={MultiSelect} placeholder="Seleccione usuario" /> */}

                  <Select id={"user"} name={"user"} value={values.user} onBlur={handleBlur} onChange={handleChange}>
                    {multiUsers.map((user, index) => (
                      <MenuItem key={index} value={user.id}>
                        {user.description}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.user && errors.user && (
                    <FormHelperText error id="helper-text-user-order">
                      {errors.user}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5">Agregar productos</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setFieldValue("products", [...values.products, { id: "", quantity: "" }]);
                    }}
                  >
                    <AddBox fontSize="large" />
                  </IconButton>
                  {values.products.length > 0 && (
                    <IconButton
                      color="primary"
                      onClick={() => {
                        values.products.pop();
                        setFieldValue("products", values.products);
                      }}
                    >
                      <IndeterminateCheckBox fontSize="large" />
                    </IconButton>
                  )}
                </Stack>

                <Grid container spacing={2}>
                  <FieldArray name="products">
                    {() =>
                      values.products.map((prod, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Grid item xs={10}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor={`products[${i}].id`} id={`products[${i}].id`}>
                                  Stock
                                </InputLabel>

                                <Select id={`products[${i}].id`} name={`products[${i}].id`} value={values.products.id} onBlur={handleBlur} onChange={handleChange} defaultValue="">
                                  {multiProducts.map((product, index) => (
                                    <MenuItem key={index} value={product.id}>
                                      {product.description}
                                    </MenuItem>
                                  ))}
                                </Select>

                                {touched.products && errors.products && errors.products[i]?.id && (
                                  <FormHelperText error id="standard-weight-helper-text-discount-item">
                                    {errors.products[i]?.id}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                            <Grid item xs={2}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor={`product[${i}].quantity`} id={`product[${i}].quantity`}>
                                  Cantidad
                                </InputLabel>

                                <OutlinedInput
                                  id={`products[${i}].quantity`}
                                  name={`products[${i}].quantity`}
                                  value={values.products.quantity}
                                  type="number"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="0"
                                  fullWidth
                                  error={Boolean(errors.products && touched.products && errors.products[i]?.quantity)}
                                  startAdornment={<InputAdornment position="end">x</InputAdornment>}
                                />
                                {touched.products && errors.products && errors.products[i]?.quantity && (
                                  <FormHelperText error id="standard-weight-helper-text-discount-item">
                                    {errors.products[i]?.quantity}
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
              <Grid item xs={8}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary">
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
