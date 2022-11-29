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

function formatFetchedData(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      return obj["data"];
    }
  }
}

function DashboardDefault() {
  const [slot, setSlot] = useState("week");

  const usersOrdersFetch = useQuery(["order"], async () => OrdersAPI.getAll());
  let usersOrdersData = [];

  const stockFetch = useQuery(["stock"], async () => StockAPI.getAll());
  let stockData = [];

  const usersFetch = useQuery(["user"], async () => UserAPI.getAll());
  let usersData = [];

  // Fetched data formatting
  if (usersOrdersFetch.isSuccess) {
    usersOrdersData = formatFetchedData(usersOrdersFetch);
  }

  if (stockFetch.isSuccess) {
    stockData = formatFetchedData(stockFetch);
  }

  if (usersFetch.isSuccess) {
    usersData = formatFetchedData(usersFetch);
  }

  return (
    <p>nada</p>
  );
}

export default DashboardDefault;
