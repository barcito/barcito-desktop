import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { AuthAPI } from "../../services/authAPI";
import { UserAPI } from "../../services/userAPI";

export default function Testing() {

    const [data, setData] = useState();

    const fetchData = async () => {
        setData( await UserAPI.getAll());
    }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Button onClick={ () => fetchData() }>Hi</Button>
        { console.log(data) }
      </Grid>
      <Grid item>
        <p>{ JSON.stringify(data) }</p>
      </Grid>
      <Grid item>
        <Button onClick={ () => AuthAPI.signOut() }>Logout</Button>
      </Grid>
    </Grid>
  )
}
