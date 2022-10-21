import { useEffect } from 'react';
import MainCard from '@/components/MainCard';
import { Grid, Stack, InputLabel, OutlinedInput, Button, Box, Divider, Switch, InputAdornment, FormHelperText } from '@mui/material';
import AnimateButton from "@/components/AnimateButton";
import { Formik, useFormikContext, useField, Field } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import MultiSelect from '@/components/MultiSelect';
import { SuppliesAPI } from '@/services/suppliesAPI';
import { CategoriesAPI } from '@/services/categoriesAPI';
import compareObjects from '@/utils/compareObjects';

export default function ProductForm({ product, mutation, handleNew }) {

    const { data: supplies, isLoading: isLoadingSupplies } = useQuery(['supplies'], () => SuppliesAPI.getAll());
    const { data: categories, isLoading: isLoadingProducts } = useQuery(['categories'], () => CategoriesAPI.getAll());

    const initialValues = product ?
        {
            ...product,
            supplies: product.supplies.map(supply => supply.id),
            categories: product.categories.map(category => category.id),
            product_img: ""
        }
        :
        {
            description: "",
            available: false,
            buyPrice: "",
            finalSellPrice: "",
            discount: "",
            associatedSellPrice: "",
            stock: "",
            lowStockWarning: "",
            lastRestock: "",
            categories: [],
            supplies: [],
            product_img: ""
        };

    if (isLoadingSupplies || isLoadingProducts) {
        return (<p>Loading...</p>)
    }

    return (
        <MainCard>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    description: Yup.string().max(255).required("La descripción es obligatoria"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const formattedValues = {
                            ...values,
                            supplies: values.supplies.map( (id) => ({id})),
                            categories: values.categories.map( (id) => ({id}))
                        }
                        if (product?.id) {
                            const editProduct = compareObjects(initialValues, formattedValues);
                            mutation.mutate({ id: product.id, product: editProduct });
                        } else {
                            handleNew({ product: formattedValues });
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

                        <Stack direction='row' spacing={1} divider={<Divider orientation="vertical" flexItem />}>

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

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="finalSellPrice-item">Precio final</InputLabel>
                                        <OutlinedInput id="finalSellPrice-item" value={values.finalSellPrice} type='number' name="finalSellPrice" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar precio final" fullWidth error={Boolean(touched.finalSellPrice && errors.finalSellPrice)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                                        {touched.finalSellPrice && errors.finalSellPrice && (
                                            <FormHelperText error id="standard-weight-helper-text-finalSellPrice-item">
                                                {errors.finalSellPrice}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="discount-item">Descuento</InputLabel>
                                        <OutlinedInput id="discount-item" value={values.discount} type='number' name="discount" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar descuento" fullWidth error={Boolean(touched.discount && errors.discount)} endAdornment={<InputAdornment position="end">%</InputAdornment>} />
                                        {touched.discount && errors.discount && (
                                            <FormHelperText error id="standard-weight-helper-text-discount-item">
                                                {errors.discount}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="associatedSellPrice-item">Precio socio</InputLabel>
                                        <AssociatedPriceField id="associatedSellPrice-item" value={values.associatedSellPrice} readOnly name="associatedSellPrice" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar precio socio" fullWidth error={Boolean(touched.associatedSellPrice && errors.associatedSellPrice)} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                                        {/* <OutlinedInput id="associatedSellPrice-item" value={values.associatedSellPrice} readOnly name="associatedSellPrice" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresar precio socio" fullWidth error={Boolean(touched.associatedSellPrice && errors.associatedSellPrice)} /> */}
                                        {touched.associatedSellPrice && errors.associatedSellPrice && (
                                            <FormHelperText error id="standard-weight-helper-text-associatedSellPrice-item">
                                                {errors.associatedSellPrice}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="category-item">Categorias</InputLabel>
                                        <Field
                                            id="category-item"
                                            name="categories"
                                            options={categories}
                                            component={MultiSelect}
                                            placeholder="Seleccione categoria"
                                            isMulti={true}
                                        />
                                        {touched.category && errors.category && (
                                            <FormHelperText error id="standard-weight-helper-text-category-item">
                                                {errors.category}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="supplies-item">Insumos</InputLabel>
                                        <Field
                                            id="supplies-item"
                                            name="supplies"
                                            options={supplies}
                                            component={MultiSelect}
                                            placeholder="Seleccione insumos"
                                            isMulti={true}
                                        />
                                        {touched.supplies && errors.supplies && (
                                            <FormHelperText error id="standard-weight-helper-text-supplies-item">
                                                {errors.supplies}
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

                            <Box sx={{ width: '50%' }}>
                                <img src={values.imagePath || '../../../src/assets/images/product-placeholder.png'} width="350px" />
                                <input id="product_img" name="product_img" type="file" onChange={(event) => {
                                    setFieldValue("product_img", event.currentTarget.files[0]); }}
                                />
                            </Box>

                        </Stack>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
}

const AssociatedPriceField = (props) => {
    const {
        values: { finalSellPrice, discount },
        touched,
        setFieldValue,
    } = useFormikContext();
    const [field] = useField(props);

    useEffect(() => {
        if (
            finalSellPrice > 0 &&
            discount > 0 &&
            touched.finalSellPrice &&
            touched.discount
        ) {
            setFieldValue(props.name, finalSellPrice - (finalSellPrice * (discount / 100)));
        } else {
            setFieldValue(props.name, finalSellPrice);
        }
    }, [discount, finalSellPrice, touched.finalSellPrice, touched.discount, setFieldValue, props.name]);

    return (
        <>
            <OutlinedInput {...props} {...field} />
        </>
    );
}