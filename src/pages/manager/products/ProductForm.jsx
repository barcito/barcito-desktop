import React, { useEffect } from "react";
import MainCard from "@/components/MainCard";
import { Grid, Stack, InputLabel, OutlinedInput, Button, Box, Divider, Switch, InputAdornment, FormHelperText, Typography, IconButton } from "@mui/material";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import AnimateButton from "@/components/AnimateButton";
import { Formik, useFormikContext, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import MultiSelect from "@/components/MultiSelect";
import { StockAPI } from "@/services/stockAPI";
import { CategoriesAPI } from "@/services/categoriesAPI";
import compareObjects from "@/utils/compareObjects";
import { isArray } from "lodash";

export default function ProductForm({ product, mutation, handleNew }) {
  const { data: stockList, isLoading: isLoadingStock } = useQuery(["stock"], () => StockAPI.getAll());
  const { data: categories, isLoading: isLoadingCategories } = useQuery(["categories"], () => CategoriesAPI.getAllProducts());

  const initialValues = product
    ? {
        ...product,
        categories: product.categories.map((category) => category.id),
        product_img: "",
      }
    : {
        description: "",
        available: false,
        finalSellPrice: "",
        associatedSellPrice: "",
        categories: [],
        productToStock: [],
        product_img: "",
      };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/jfif"];
  const FILE_SIZE = 10000000;

  if (isLoadingStock || isLoadingCategories) {
    return <p>Loading...</p>;
  }

  return (
    <MainCard>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          description: Yup.string().max(255).required("La descripción es obligatoria"),
          finalSellPrice: Yup.number().min(1).required("El precio de venta final es obligatorio"),
          associatedSellPrice: Yup.number().min(1).required("El precio de venta al socio es obligatorio"),
          categories: Yup.array().of(Yup.number()).min(1, "Debe seleccionar al menos una categoría"),
          productToStock: Yup.array()
            .of(
              Yup.object().shape({
                stockId: Yup.number().required("Debe seleccionar un artículo en stock"),
                quantity: Yup.number().required("Debe cargar la cantidad"),
              })
            )
            .min(1, "Debe seleccionar al menos un articulo del stock"),
          product_img: Yup.mixed()
            .required("Se tiene que seleccionar una imagen")
            .test("fileSize", "Archivo muy pesado", (value) => value && value.size <= FILE_SIZE)
            .test("fileFormat", "Formato no soportado", (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (product?.id) {
              const editProduct = compareObjects(initialValues, values);
              if (editProduct.categories) {
                editProduct.categories = editProduct.categories.map((id) => ({ id }));
              }
              mutation.mutate({ id: product.id, product: editProduct });
            } else {
              const newProduct = { ...values };
              if (values.categories) {
                newProduct.categories = values.categories.map((id) => ({ id }));
              }
              handleNew(newProduct);
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
        {({ errors, setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
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
                  <Stack spacing={1} alignItems="center">
                    <InputLabel htmlFor="available-item">Disponible</InputLabel>
                    <Switch id="available-item" checked={values.available} value={values.available} name="available" onBlur={handleBlur} onChange={handleChange} /* error={Boolean(touched.available && errors.available)} */ />
                    {/* {touched.available && errors.available && (
                                                <FormHelperText error id="standard-weight-helper-text-available-item">
                                                    {errors.available}
                                                </FormHelperText>
                                            )} */}
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="finalSellPrice-item">Precio final</InputLabel>
                    <OutlinedInput
                      id="finalSellPrice-item"
                      value={values.finalSellPrice}
                      type="number"
                      name="finalSellPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ingresar precio final"
                      fullWidth
                      error={Boolean(touched.finalSellPrice && errors.finalSellPrice)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    {touched.finalSellPrice && errors.finalSellPrice && (
                      <FormHelperText error id="standard-weight-helper-text-finalSellPrice-item">
                        {errors.finalSellPrice}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="associatedSellPrice-item">Precio socio</InputLabel>
                    <OutlinedInput
                      id="associatedSellPrice-item"
                      value={values.associatedSellPrice}
                      type="number"
                      name="associatedSellPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Ingresar precio socio"
                      fullWidth
                      error={Boolean(touched.associatedSellPrice && errors.associatedSellPrice)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    {touched.associatedSellPrice && errors.associatedSellPrice && (
                      <FormHelperText error id="standard-weight-helper-text-associatedSellPrice-item">
                        {errors.associatedSellPrice}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="categories">Categorias</InputLabel>
                    <Field id="categories" name="categories" options={categories} component={MultiSelect} placeholder="Seleccione categoría" isMulti={true} />
                    {touched.categories && errors.categories && (
                      <FormHelperText error id="standard-weight-helper-text-categories">
                        {errors.categories}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h5">Stock utilizado</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setFieldValue("productToStock", [...values.productToStock, { stockId: "", quantity: "" }]);
                      }}
                    >
                      <AddBox fontSize="large" />
                    </IconButton>
                    {values.productToStock.length > 0 && (
                      <IconButton
                        color="primary"
                        onClick={() => {
                          values.productToStock.pop();
                          setFieldValue("productToStock", values.productToStock);
                        }}
                      >
                        <IndeterminateCheckBox fontSize="large" />
                      </IconButton>
                    )}
                  </Stack>
                  {touched.productToStock && errors.productToStock && !isArray(errors.productToStock) && (
                    <FormHelperText error id="standard-weight-helper-text-stock-array-item">
                      {errors.productToStock}
                    </FormHelperText>
                  )}
                  <Grid container spacing={2}>
                    <FieldArray name="productToStock">
                      {() =>
                        values.productToStock.map((stock, i) => {
                          return (
                            <React.Fragment key={i}>
                              <Grid item xs={6}>
                                <Stack spacing={1}>
                                  <Field id={`stock-item-${stock.id}`} name={`productToStock.${i}.stockId`} options={stockList} component={MultiSelect} placeholder="Seleccione stock" />
                                  {touched.productToStock && errors.productToStock && errors.productToStock[i]?.stockId && (
                                    <FormHelperText error id="standard-weight-helper-text-id-item">
                                      {errors.productToStock[i]?.stockId}
                                    </FormHelperText>
                                  )}
                                </Stack>
                              </Grid>
                              <Grid item xs={3}>
                                <Stack spacing={1}>
                                  <OutlinedInput
                                    id={`stock-item-${stock.id}-quantity`}
                                    value={values.productToStock[i].quantity}
                                    type="number"
                                    name={`productToStock.${i}.quantity`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Ingresar cantidad"
                                    fullWidth
                                    error={Boolean(errors.productToStock && touched.productToStock && errors.productToStock[i]?.quantity)}
                                    startAdornment={<InputAdornment position="end">x</InputAdornment>}
                                  />
                                  {touched.productToStock && errors.productToStock && errors.productToStock[i]?.quantity && (
                                    <FormHelperText error id="standard-weight-helper-text-quantity-item">
                                      {errors.productToStock[i]?.quantity}
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

              <Box sx={{ width: "50%" }}>
                <img src={values.imagePath || "../../../src/assets/images/product-placeholder.png"} width="350px" />
                <input
                  id="product_img"
                  name="product_img"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("product_img", event.currentTarget.files[0]);
                  }}
                />
                {touched.product_img && errors.product_img && (
                  <FormHelperText error id="standard-weight-helper-text-product_img-item">
                    {errors.product_img}
                  </FormHelperText>
                )}
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
