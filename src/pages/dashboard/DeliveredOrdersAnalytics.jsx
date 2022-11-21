import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "../../components/MainCard";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

function filterDeliveredOrders(usersOrdersData) {
  const deliveredOrders = usersOrdersData.filter((order) => {
    return order.status === "Entregado";
  });
  return deliveredOrders;
}

function calculateLastWeekDeliveredOrders(deliveredUsersOrders) {
  const lastWeekDeliveredOrders = deliveredUsersOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    return orderDate >= lastWeekDate;
  });
  return lastWeekDeliveredOrders.length;
}

function calculateLastWeekDeliveredOrdersPercentage(deliveredUsersOrders) {
  const lastWeekDeliveredOrders = calculateLastWeekDeliveredOrders(deliveredUsersOrders);
  const lastWeekDeliveredOrdersPercentage = (lastWeekDeliveredOrders / deliveredUsersOrders.length) * 100;
  return Math.round(lastWeekDeliveredOrdersPercentage);
}

function DeliveredOrdersAnalytics({ color, usersOrdersData }) {
  let deliveredUsersOrders = filterDeliveredOrders(usersOrdersData);
  let percentage = calculateLastWeekDeliveredOrdersPercentage(deliveredUsersOrders);
  const isLoss = false;

  if (percentage <= 0) {
    isLoss = true;
  }

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Total Semanal Pedidos Entregados
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {deliveredUsersOrders.length}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={isLoss ? "error" : "success"}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}
                    {isLoss && <FallOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          La última semana se entregaron{" "}
          <Typography component="span" variant="caption" sx={{ color: `${color || "primary"}.main` }}>
            {calculateLastWeekDeliveredOrders(deliveredUsersOrders)}
          </Typography>{" "}
          pedidos
        </Typography>
      </Box>
    </MainCard>
  );
}

export default DeliveredOrdersAnalytics;

DeliveredOrdersAnalytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

DeliveredOrdersAnalytics.defaultProps = {
  color: "primary",
};
