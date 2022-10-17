import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import MultiSelect from '@/components/MultiSelect';
import AnimateButton from "@/components/AnimateButton";
import { MenuItem, Select, FormGroup, Checkbox, FormControlLabel, FormControl } from "@mui/material";
import compareObjects from '@/utils/compareObjects';
import { useQuery } from "react-query";
import { AcademicUnitsAPI } from "@/services/academicUnitsAPI";

export default function UserEditModal({ user, modalOpen, closeModal, mutation }) {
  
  const { data: academicUnits, isLoading } = useQuery(['academic-units'], () => AcademicUnitsAPI.getAll());

  const availableRoles = ["admin", "manager", "submanager", "user"];

  const initialValues = user.id ? 
    {
      name: user.fullName.split(" ")[1],
      surname: user.fullName.split(" ")[0],
      email: user.email,
      academicUnit: user.academicUnit.id,
      phone: user.phone,
      dni: user.dni,
      roles: user.roles
    }
    :
    {
      name: "",
      surname: "",
      email: "",
      academicUnit: "",
      phone: "",
      dni: "",
      roles: []
    };

  if(isLoading){
    <p>Loading...</p>
  }

  return (
    <Dialog open={modalOpen} onClose={() => closeModal(false)}>
      <DialogTitle>{user ? "Editar" : "Nuevo"} usuario</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Campo obligatorio"),
            surname: Yup.string().max(255).required("Campo obligatorio"),
            email: Yup.string().email("El email es inválido").max(255).required("Campo obligatorio"),
            phone: Yup.string().matches(/^\d+$/, "Este campo acepta solo números").min(9, "Telefono invalido").max(11, "Telefono invalido").required("Campo obligatorio"),
            dni: Yup.string().matches(/^\d+$/, "Este campo acepta solo números").min(7, "DNI invalido").max(9, "DNI invalido").required("Campo obligatorio"),
            roles: Yup.array().min(1, "Seleccionar al menos un rol"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (user?.id) {
                const dataToSend = compareObjects(initialValues, values);
                mutation.mutate({id: user.id, data: dataToSend});
              } else {
                const data = {
                  ...values,
                  password: "123456",
                };
                mutation.mutate({ id: null, data: data});
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
                    <InputLabel htmlFor="name-edit">Nombre</InputLabel>
                    <OutlinedInput id="name-login" value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} placeholder="Cosme" fullWidth error={Boolean(touched.name && errors.name)} />
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
                    <OutlinedInput fullWidth error={Boolean(touched.surname && errors.surname)} id="surname-edit" value={values.surname} name="surname" onBlur={handleBlur} onChange={handleChange} placeholder="Fulanito" inputProps={{}} />
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
                    <Field
                        id="academicUnit-edit"
                        name="academicUnit"
                        options={academicUnits}
                        component={MultiSelect}
                        placeholder="Seleccione unidad academica"
                    />
                    {touched.supplies && errors.supplies && (
                        <FormHelperText error id="standard-weight-helper-text-supplies-item">
                            {errors.supplies}
                        </FormHelperText>
                    )}
                    {/* <Select fullWidth id="academicUnit-edit" value={values.academicUnit} name="academicUnit" onBlur={handleBlur} onChange={handleChange} inputProps={{}}>
                      {academicUnits.map((unit, index) => (
                        <MenuItem key={index} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select> */}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="roles-edit">Roles</InputLabel>
                    <FormControl component="fieldset" variant="standard" error={Boolean(touched.roles && errors.roles)} onBlur={handleBlur} onChange={handleChange}>
                      <FormGroup>
                        <Grid container>
                          {availableRoles.map((role) => (
                            <Grid item xs={3} key={role}>
                              <FormControlLabel control={<Checkbox checked={values.roles.includes(role)} id="roles-edit" name="roles" inputProps={{}} value={role} />} label={role} />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </FormControl>
                    {touched.roles && errors.roles && (
                      <FormHelperText error id="helper-text-roles-edit">
                        {errors.roles}
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
                    <Button disableElevation onClick={() => closeModal(false)} disabled={isSubmitting} size="large" variant="contained" color="secondary">
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
      <DialogActions></DialogActions>
    </Dialog>
  );
}
