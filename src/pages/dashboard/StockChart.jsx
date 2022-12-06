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
      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <BsBoxSeam />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 1"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $8000
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 200
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>

      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <BsBoxSeam />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 2"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $5500
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 100
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>

      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <BsBoxSeam />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 3"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $6750
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 50
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>

      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <IoFastFoodOutline />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 4"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $8500
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 50
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>

      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "success.main",
              bgcolor: "success.lighter",
            }}
          >
            <IoFastFoodOutline />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 5"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $7650
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 100
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>

      <ListItemButton divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "error.main",
              bgcolor: "error.lighter",
            }}
          >
            <IoWarningOutline />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="subtitle1">{"Item 6"}</Typography>} secondary={"06/12/2022 16:30"} />
        <ListItemSecondaryAction>
          <Stack alignItems="flex-end">
            <Typography variant="subtitle1" noWrap>
              + $7650
            </Typography>
            <Typography variant="h6" color="secondary" noWrap>
              x 100
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>
    </List>
  );
}

export default StockChart;
