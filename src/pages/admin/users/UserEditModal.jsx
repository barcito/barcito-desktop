import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import { Formik } from "formik";
import AnimateButton from "../../../components/AnimateButton";
import { strengthColor, strengthIndicator } from "../../../utils/password.util";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { UserAPI } from "../../../services/userAPI";
import { MenuItem, Select } from "@mui/material";

export default function UserEditModal({ user, modalOpen, closeModal, setEditUser }) {

    const academicUnits = [
        "Sin definir",
        "Facultad de Informatica"
      ];
    
      const [level, setLevel] = useState();
      const [showPassword, setShowPassword] = useState(false);
      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
      };
    
      useEffect(() => {
        changePassword("");
      }, []);

    return (
        <Dialog open={modalOpen} onClose={() => closeModal(false)}>
            <DialogTitle>Editar usuario</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: "" || user?.fullName.split(" ")[1],
                        surname: "" || user?.fullName.split(" ")[0],
                        email: "" || user?.email,
                        /* password: "", */
                        academicUnit: "Sin definir" || user?.academicUnit,/* 
                        certificate: "" || user?.certificate, */
                        phone: "" || user?.phone,
                        dni: "" || user?.dni,/* 
                        roles: [] || user?.roles, */
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
                            let response = null;
                            if(user?.id){
                                response = await UserAPI.update(user.id, values, true);
                            }else{
                                const data = {
                                    ...values,
                                    password: "123456"
                                }
                                response = await UserAPI.create(values, true);
                            }
                            if (response) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                setEditUser(user?.id);
                                closeModal(false);
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
                                </Grid><Grid item xs={12}>
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
                                {/* <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-edit">Contraseña</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="password-edit"
                                            type={showPassword ? "text" : "password"}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePassword(e.target.value);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="******"
                                            inputProps={{ autoComplete: "current-password" }}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="helper-text-password-edit">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    sx={{
                                                        bgcolor: level?.color,
                                                        width: 85,
                                                        height: 8,
                                                        borderRadius: "7px",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid> */}
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
                                        <Select fullWidth id="academicUnit-edit" value={values.academicUnit} name="academicUnit" onBlur={handleBlur} onChange={handleChange} inputProps={{}}>
                                            {academicUnits.map((unit, index) =>
                                                <MenuItem key={index} value={unit}>{unit}</MenuItem>
                                            )}
                                        </ Select>
                                    </Stack>
                                </Grid>

                                
                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button disableElevation onClick={ () => closeModal(false) } disabled={isSubmitting} size="large" variant="contained" color="secondary">
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
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
            </DialogContent>
            <DialogActions>
                
            </DialogActions>
        </Dialog>
    );
}