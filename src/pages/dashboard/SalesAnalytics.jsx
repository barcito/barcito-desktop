import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "../../components/MainCard";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

function filterDeliveredOrders(usersOrdersData) {
  let deliveredOrders = usersOrdersData.filter((order) => {
    return order.status === "Entregado";
  });
  return deliveredOrders;
}

function calculateLastWeekDeliveredOrders(deliveredUsersOrders) {
  let lastWeekDeliveredOrders = deliveredUsersOrders.filter((order) => {
    let orderDate = new Date(order.createdAt);
    let lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    return orderDate >= lastWeekDate;
  });
  return lastWeekDeliveredOrders.length;
}

function calculateLastWeekTotalSum(deliveredUsersOrders) {
  let lastWeekDeliveredOrders = deliveredUsersOrders.filter((order) => {
    let orderDate = new Date(order.createdAt);
    let lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    return orderDate >= lastWeekDate;
  });
  let totalSum = 0;
  lastWeekDeliveredOrders.forEach((order) => {
    totalSum += parseFloat(order.amount);
  });
  return totalSum;
}

function calculateStockTotalSum(stockData) {
  let totalSum = 0;
  stockData.forEach((stock) => {
    totalSum += stock.cost * stock.quantity;
  });
  return totalSum;
}

function calculateLastWeekDeliveredOrdersGainPercentage(totalSum, stockTotalSum) {
  let percentageGain = Math.round((totalSum * 100) / stockTotalSum);
  return percentageGain;
}

function SalesAnalytics({ color, usersOrdersData, stockData }) {
  let deliveredUsersOrders = filterDeliveredOrders(usersOrdersData);
  let totalSum = calculateLastWeekTotalSum(deliveredUsersOrders);
  let lastWeekDeliveredOrdersTotal = calculateLastWeekDeliveredOrders(deliveredUsersOrders);
  let stockTotalSum = calculateStockTotalSum(stockData);

  let percentage = calculateLastWeekDeliveredOrdersGainPercentage(totalSum, stockTotalSum);
  let extra = totalSum - stockTotalSum;
  let isLoss = false;

  if (isNaN(percentage)) {
    percentage = 0;
  }

  if (percentage <= 0) {
    isLoss = true;
  }

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Total Semanal Recaudado
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              ${parseFloat(totalSum)}
            </Typography>
          </Grid>
          {percentage !== 0 && (
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

          {percentage === 0 && (
            <Grid item>
              <Chip variant="combined" color={"error"} icon={<>{isLoss && <FallOutlined style={{ fontSize: "0.75rem", color: "inherit" }} />}</>} label={`${percentage}%`} sx={{ ml: 1.25, pl: 1 }} size="small" />
            </Grid>
          )}
        </Grid>
      </Stack>
      {extra > 0 ? (
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="textSecondary">
            En la última semana se ganaron{" $"}
            <Typography component="span" variant="caption" sx={{ color: `${color || "primary"}.main` }}>
              {extra}
            </Typography>{" "}
            extra
          </Typography>
        </Box>
      ) : (
        <Box sx={{ pt: 4.5 }}>
          {/* <Typography variant="caption" color="textSecondary">
            La última semana se ganaron{" $"}
            <Typography component="span" variant="caption" sx={{ color: `${color || "primary"}.main` }}>
              {extra}
            </Typography>{" "}
            extra
          </Typography> */}
        </Box>
      )}
    </MainCard>
  );
}

export default SalesAnalytics;

SalesAnalytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

SalesAnalytics.defaultProps = {
  color: "primary",
};
