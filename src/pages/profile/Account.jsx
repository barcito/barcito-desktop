import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { UserAPI } from "../../services/userAPI";
import { AccountProfile } from "./AccountProfile";
import { AccountProfileDetails } from "./AccountProfileDetails";
// import { DashboardLayout } from "../components/dashboard-layout";
export default function Account() {
  const [userData, setUserData] = useState(
    UserAPI.getByEmail(localStorage.getItem("email"))
  );

//   console.log(userData);

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
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile userData={userData} setUserData={setUserData} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails userData={userData} setUserData={setUserData}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

// Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
