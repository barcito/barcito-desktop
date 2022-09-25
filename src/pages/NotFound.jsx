import Grid from "@mui/material/Grid";
import NotFoundImage from "../assets/images/notFound.png";

function NotFound() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img src={NotFoundImage} alt={"not found"} />
      </Grid>
      <Grid item>
        <h1>This page could not be found</h1>
      </Grid>
    </Grid>
  );
}

export default NotFound;
