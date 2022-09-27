import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { UserAPI } from "../../services/userAPI";

//TODO: Los datos cargados tienen que ser acordes a la informacion que queremos dar la posibilidad de cambiar
//TODO: Esta constante debería definirse con la informacion del usuario traida de la API
//!Esto no esta correcto asi, solo lo dejo como un ejemplo de lo que deberia hacer, probablement

export function AccountProfile({userData, setUserData}) {

  //TODO: Setear el objeto con
  // setUserData(getUserData(id));

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={userData.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userData.name}
          </Typography>
          {/* <Typography color="textSecondary" variant="body2">
            {`${userData.city} ${userData.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userData.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

/**
 * Funcion que setearia el objeto con la informacion???
 */
// async function getUserData(id) {
//   return UserAPI.get(id); //? Algo asi quedaria? Capaz en el elemento padre Account
// }
