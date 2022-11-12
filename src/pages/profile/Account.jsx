import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { UserAPI } from "@/services/userAPI";
import { Credential } from "./Credential";
import { AccountProfileDetails } from "./AccountProfileDetails";
import { useEffect } from "react";

export default function Account() {
  const [userData, setUserData] = useState();

  useEffect ( () => {
    const getUser = async () => {
      const user = await UserAPI.getByEmail(localStorage.getItem("email"));
      setUserData(user);
    }
    getUser()
  }, [])

  if(!userData){
    return(
      <div>Loading...</div>
    );
  }else{
  return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Perfil
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails user={userData} setUserData={setUserData}/>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                {/* <Credential userData={userData} setUserData={setUserData} /> */}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

// Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
