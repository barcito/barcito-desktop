import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OrdersTable from "./OrdersTable";
import StockChart from "./StockChart";
import IncomeAreaChart from "./IncomeAreaChart";
import MonthlyBarChart from "./MonthlyBarChart";
import MainCard from "../../components/MainCard";
import AssociatedUsersAnalytics from "./AssociatedUsersAnalytics";
import DeliveredOrdersAnalytics from "./DeliveredOrdersAnalytics";
import SalesAnalytics from "./SalesAnalytics";

import { useQuery } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";
import { StockAPI } from "@/services/stockAPI";
import { UserAPI } from "@/services/userAPI";

function DashboardDefault() {
  const [slot, setSlot] = useState("week");
  let [usersOrdersData, setUsersOrdersData] = useState([]);
  let [stockData, setStockData] = useState([]);
  let [usersData, setUsersData] = useState([]);

  let usersOrdersFetch = useQuery(["order"], async () => OrdersAPI.getAll(), { onSuccess: setUsersOrdersData });
  let stockFetch = useQuery(["stock"], async () => StockAPI.getAll(), { onSuccess: setStockData });
  let usersFetch = useQuery(["user"], async () => UserAPI.getAll(), { onSuccess: setUsersData });

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <AssociatedUsersAnalytics usersData={usersData} />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <DeliveredOrdersAnalytics usersOrdersData={usersOrdersData} />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <SalesAnalytics usersOrdersData={usersOrdersData} stockData={stockData} />
      </Grid>
      <Grid item md={8} sx={{ display: { sm: "none", md: "block", lg: "none" } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Pedidos Recientes</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable usersOrdersData={usersOrdersData} />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Stock</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <StockChart stockData={stockData} />
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Ayuda y Soporte
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Tiempo de respuesta promedio: 5 minutos
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: "capitalize" }}>
              Enviar Email
            </Button>
          </Stack>
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Cantidad de Ventas</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                Estadística Mensual
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart usersOrdersData={usersOrdersData} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Ventas a Usuarios</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button size="small" onClick={() => setSlot("month")} color={slot === "month" ? "primary" : "secondary"} variant={slot === "month" ? "outlined" : "text"}>
                Mes
              </Button>
              <Button size="small" onClick={() => setSlot("week")} color={slot === "week" ? "primary" : "secondary"} variant={slot === "week" ? "outlined" : "text"}>
                Semana
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} usersOrdersData={usersOrdersData} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
    // <div>hola</div>
  );
}

export default DashboardDefault;
