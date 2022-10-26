import Grid from "@mui/material/Grid";
import NotAuthorizedImage from "../assets/images/notAuthrorized.png";

function NotAuthorized() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img src={NotAuthorizedImage} alt={"not authorized"} />
      </Grid>
      <Grid item>
        <h1>Acceso restringido</h1>
      </Grid>
    </Grid>
  );
}

export default NotAuthorized;
