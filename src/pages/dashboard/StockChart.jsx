import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GiftOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";
import { IoFastFoodOutline, IoWarningOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function formatStockDate(date) {
  const dateObj = new Date(date);

  let formattedDate = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
  let formattedDateMinutes = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
  let formattedDateTime = formattedDate + " " + dateObj.getHours() + ":" + formattedDateMinutes + ":" + dateObj.getSeconds();

  return `${formattedDateTime}`;
}

function StockChart({ stockData }) {
  const [order] = useState("desc");
  const [orderBy] = useState("updatedAt");
  const avatarSX = {
    width: 36,
    height: 36,
    fontSize: "1rem",
  };

  const actionSX = {
    mt: 0.75,
    ml: 1,
    top: "auto",
    right: "auto",
    alignSelf: "flex-start",
    transform: "none",
  };

  return (
    <List
      component="nav"
      sx={{
        px: 0,
        py: 0,
        "& .MuiListItemButton-root": {
          py: 1,
          "& .MuiAvatar-root": avatarSX,
          "& .MuiListItemSecondaryAction-root": {
            ...actionSX,
            position: "relative",
          },
        },
      }}
    >
      {stableSort(stockData.slice(0, 5), getComparator(order, orderBy)).map((stock) => (
        <ListItemButton key={stock.id} divider>
          <ListItemAvatar>
            {stock.quantity <= stock.warning ? (
              <Avatar
                sx={{
                  color: "error.main",
                  bgcolor: "error.lighter",
                }}
              >
                {/* <GiftOutlined /> */}
                <IoWarningOutline />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  color: "success.main",
                  bgcolor: "success.lighter",
                }}
              >
                {/* <GiftOutlined /> */}
                {stock.type === "Consumible" && <IoFastFoodOutline />}
                {stock.type === "Insumo" && <BsBoxSeam />}
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">{stock.description}</Typography>} secondary={formatStockDate(stock.createdAt)} />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + ${stock.cost * stock.quantity}
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                x {stock.quantity}
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
      ))}
    </List>
  );
}

export default StockChart;
