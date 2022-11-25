import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import AnimateButton from "@/components/AnimateButton";
import { strengthColor, strengthIndicator } from "@/utils/password.util";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { UserAPI } from "@/services/userAPI";
import { MenuItem, Select } from "@mui/material";
import { useQuery } from "react-query";
import { AcademicUnitsAPI } from "@/services/academicUnitsAPI";
import MultiSelect from "@/components/MultiSelect";

export function AccountProfileDetails({ user }) {
  const { data: academicUnits, isLoading } = useQuery(["academic-units"], () => AcademicUnitsAPI.getAll());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{
        name: user?.name,
        surname: "" || user?.surname,
        email: "" || user?.email,
        /* password: "", */
        academicUnit: "" || user?.academicUnit?.id /*
                        certificate: "" || user?.certificate, */,
        phone: "" || user?.phone,
        dni: "" || user?.dni /* 
                        roles: [] || user?.roles, */,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Campo obligatorio"),
        surname: Yup.string().max(255).required("Campo obligatorio"),
        email: Yup.string().email("El email es inválido").max(255).required("Campo obligatorio"),
        /* password: Yup.string().max(255).required("Campo obligatorio"), */
        phone: Yup.number().required("Campo obligatorio"),
        dni: Yup.number().required("Campo obligatorio"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await UserAPI.update(user.id, values, true);
          if (response) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name-edit">Nombre</InputLabel>
                <OutlinedInput id="name-login" type="name" value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} placeholder="Cosme" fullWidth error={Boolean(touched.name && errors.name)} />
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-edit">
                    {errors.name}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="surname-edit">Apellido</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.surname && errors.surname)} id="surname-edit" type="surname" value={values.surname} name="surname" onBlur={handleBlur} onChange={handleChange} placeholder="Fulanito" inputProps={{}} />
                {touched.surname && errors.surname && (
                  <FormHelperText error id="helper-text-surname-edit">
                    {errors.surname}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-edit">Email</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.email && errors.email)} id="email-login" type="email" value={values.email} name="email" onBlur={handleBlur} onChange={handleChange} placeholder="demo@dni.com" inputProps={{ autoComplete: "username" }} />
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-edit">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="phone-edit">Telefono</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.phone && errors.phone)} id="phone-edit" value={values.phone} name="phone" onBlur={handleBlur} onChange={handleChange} placeholder="12.345.678" inputProps={{}} />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="helper-text-phone-edit">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="dni-edit">DNI</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.dni && errors.dni)} id="dni-edit" value={values.dni} name="dni" onBlur={handleBlur} onChange={handleChange} placeholder="12.345.678" inputProps={{}} />
                {touched.dni && errors.dni && (
                  <FormHelperText error id="helper-text-dni-edit">
                    {errors.dni}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="academicUnit-edit">Unidad academica</InputLabel>
                <Field id="academicUnit-edit" name="academicUnit" options={academicUnits} component={MultiSelect} placeholder="Seleccione unidad academica" />
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
            <Grid item xs={6}>
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
  );
}
