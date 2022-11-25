import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import AnimateButton from "@/components/AnimateButton";
import { useQuery } from "react-query";
import { AcademicUnitsAPI } from "@/services/academicUnitsAPI";
import MultiSelect from "@/components/MultiSelect";
import compareObjects from "@/utils/compareObjects";

export default function BarcitoForm({ barcito, mutation }) {
  const { data: academicUnits, isLoading } = useQuery(["academic-units"], () => AcademicUnitsAPI.getAll());
  const initialValues = barcito.id
    ? { ...barcito, academicUnit: barcito.academicUnit?.id }
    : {
        name: "",
        academicUnitId: "",
        openTime: "",
        closeTime: "",
        location: "",
      };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Campo obligatorio"),
        academicUnitId: Yup.number().required("Campo obligatorio"),
        openTime: Yup.string().max(255).required("Campo obligatorio"),
        closeTime: Yup.string().max(255).required("Campo obligatorio"),
        location: Yup.string().max(255).required("Campo obligatorio"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (barcito.id) {
            const dataToSend = compareObjects(initialValues, values);
            mutation.mutate({ id: barcito.id, data: dataToSend });
          } else {
            mutation.mutate({ id: null, data: values });
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
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name-bar">Nombre</InputLabel>
                <OutlinedInput id="name-bar" type="name" value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} placeholder="Barcito" fullWidth error={Boolean(touched.name && errors.name)} />
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-bar">
                    {errors.name}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="academicUnit-bar">Unidad academica</InputLabel>
                <Field id="academicUnit-bar" name="academicUnitId" options={academicUnits} component={MultiSelect} placeholder="Seleccione unidad academica" />
                {touched.supplies && errors.supplies && (
                  <FormHelperText error id="standard-weight-helper-text-supplies-item">
                    {errors.supplies}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="openTime-bar">Horario apertura</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.openTime && errors.openTime)} id="openTime-bar" type="openTime" value={values.openTime} name="openTime" onBlur={handleBlur} onChange={handleChange} placeholder="HH:MM" inputProps={{}} />
                {touched.openTime && errors.openTime && (
                  <FormHelperText error id="helper-text-openTime-bar">
                    {errors.openTime}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="closeTime-bar">Horario cierre</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.closeTime && errors.closeTime)} id="closeTime-bar" type="closeTime" value={values.closeTime} name="closeTime" onBlur={handleBlur} onChange={handleChange} placeholder="HH:MM" inputProps={{}} />
                {touched.closeTime && errors.closeTime && (
                  <FormHelperText error id="helper-text-closeTime-bar">
                    {errors.closeTime}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="location-bar">Ubicaci&oacute;n</InputLabel>
                <OutlinedInput fullWidth error={Boolean(touched.location && errors.location)} id="location-bar" value={values.location} name="location" onBlur={handleBlur} onChange={handleChange} placeholder="????" inputProps={{}} />
                {touched.location && errors.location && (
                  <FormHelperText error id="helper-text-location-bar">
                    {errors.location}
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
