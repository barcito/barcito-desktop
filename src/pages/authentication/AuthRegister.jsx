import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import AnimateButton from "../../components/AnimateButton";
import { strengthColor, strengthIndicator } from "../../utils/password.util";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { AuthAPI } from "../../services/authAPI";
import { MenuItem, Select } from "@mui/material";

function AuthRegister() {
  const academicUnits = [
    "Sin definir",
    "Facultad de Informatica"
  ];

  const navigate = useNavigate();

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
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          surname: "",
          dni: "",
          phone: "",
          academicUnit: "Sin definir",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("El email es inválido").max(255).required("Campo obligatorio"),
          password: Yup.string().max(255).required("Campo obligatorio"),
          name: Yup.string().max(255).required("Campo obligatorio"),
          surname: Yup.string().max(255).required("Campo obligatorio"),
          dni: Yup.number().required("Campo obligatorio"),
          phone: Yup.number().required("Campo obligatorio"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await AuthAPI.signUp(values, true);
            if(response){
              navigate('/');
            }
            setStatus({ success: true });
            setSubmitting(false);
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
                  <InputLabel htmlFor="name-signup">Nombre</InputLabel>
                  <OutlinedInput id="name-signup" type="name" value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} placeholder="Cosme" fullWidth error={Boolean(touched.name && errors.name)} />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="surname-signup">Apellido</InputLabel>
                  <OutlinedInput fullWidth error={Boolean(touched.surname && errors.surname)} id="surname-signup" type="surname" value={values.surname} name="surname" onBlur={handleBlur} onChange={handleChange} placeholder="Fulanito" inputProps={{}} />
                  {touched.surname && errors.surname && (
                    <FormHelperText error id="helper-text-surname-signup">
                      {errors.surname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="dni-signup">DNI</InputLabel>
                  <OutlinedInput fullWidth error={Boolean(touched.dni && errors.dni)} id="dni-signup" value={values.dni} name="dni" onBlur={handleBlur} onChange={handleChange} placeholder="12.345.678" inputProps={{}} />
                  {touched.dni && errors.dni && (
                    <FormHelperText error id="helper-text-dni-signup">
                      {errors.dni}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Telefono</InputLabel>
                  <OutlinedInput fullWidth error={Boolean(touched.phone && errors.phone)} id="phone-signup" value={values.phone} name="phone" onBlur={handleBlur} onChange={handleChange} placeholder="12.345.678" inputProps={{}} />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="academicUnit-signup">Unidad academica</InputLabel>
                  <Select fullWidth id="academicUnit-signup" value={values.academicUnit} name="academicUnit" onBlur={handleBlur} onChange={handleChange} inputProps={{}}>
                    {academicUnits.map( (unit, index) => 
                      <MenuItem key={index} value={unit}>{unit}</MenuItem>
                    )}
                  </ Select>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email</InputLabel>
                  <OutlinedInput fullWidth error={Boolean(touched.email && errors.email)} id="email-login" type="email" value={values.email} name="email" onBlur={handleBlur} onChange={handleChange} placeholder="demo@dni.com" inputProps={{ autoComplete: "username" }} />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
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
                    <FormHelperText error id="helper-text-password-signup">
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
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Crear Cuenta
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AuthRegister;
