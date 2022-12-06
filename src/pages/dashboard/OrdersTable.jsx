import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NumberFormat from "react-number-format";
import Dot from "../../components/Dot";

import { useQueries } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";

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

const headCells = [
  {
    id: "code",
    align: "left",
    disablePadding: false,
    label: "Código de Retiro",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Nombre Producto",
  },
  {
    id: "quantity",
    align: "right",
    disablePadding: false,
    label: "Cantidad",
  },
  {
    id: "stutus",
    align: "left",
    disablePadding: false,
    label: "Estado",
  },
  {
    id: "amount",
    align: "right",
    disablePadding: false,
    label: "Total",
  },
];

function OrderTableHead({ productsOrdered, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? productsOrdered : false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE - STATUS ||============================== //
const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case "Pendiente":
      color = "primary";
      title = "Pendiente";
      break;
    case "Preparado":
      color = "warning";
      title = "Preparado";
      break;
    case "Entregado":
      color = "success";
      title = "Entregado";
      break;
    case "Rechazado":
      color = "error";
      title = "Rechazado";
      break;
    case "Cancelado":
      color = "error";
      title = "Cancelado";
      break;
    default:
      color = "primary";
      title = "???";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.string,
};

export default function OrderTable({ usersOrdersData }) {
  const [order] = useState("asc");
  const [orderBy] = useState("code");
  const [selected] = useState([]);

  const isSelected = (code) => selected.indexOf(code) !== -1;

  const usersOrderedProducts = useQueries(
    usersOrdersData?.map((userOrderData) => {
      return {
        queryKey: ["code", userOrderData.code],
        queryFn: () => OrdersAPI.getByCode(userOrderData.code),
      };
    })
  );

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead usersOrderedProducts={usersOrderedProducts} orderBy={orderBy} />
          <TableBody>
            {/* {stableSort(usersOrderedProducts, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.data?.code);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.data?.code}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.data?.products[0].product.description}</TableCell>
                  <TableCell align="right">{row.data?.products[0].quantity}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.data?.status} />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.data?.amount} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })} */}
            <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} tabIndex={-1}>
              <TableCell component="th" id={1} scope="row" align="left">
                <Link color="secondary" to="">
                  041203941245
                </Link>
              </TableCell>
              <TableCell align="left">Producto 1</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="left">
                <OrderStatus status={"Pendiente"} />
              </TableCell>
              <TableCell align="right">
                <NumberFormat value={"400"} displayType="text" thousandSeparator prefix="$" />
              </TableCell>
            </TableRow>

            <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} tabIndex={-1}>
              <TableCell component="th" id={1} scope="row" align="left">
                <Link color="secondary" to="">
                  041203941221
                </Link>
              </TableCell>
              <TableCell align="left">Producto 2</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="left">
                <OrderStatus status={"Preparado"} />
              </TableCell>
              <TableCell align="right">
                <NumberFormat value={"400"} displayType="text" thousandSeparator prefix="$" />
              </TableCell>
            </TableRow>

            <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} tabIndex={-1}>
              <TableCell component="th" id={1} scope="row" align="left">
                <Link color="secondary" to="">
                  041201232412
                </Link>
              </TableCell>
              <TableCell align="left">Producto 3</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="left">
                <OrderStatus status={"Entregado"} />
              </TableCell>
              <TableCell align="right">
                <NumberFormat value={"400"} displayType="text" thousandSeparator prefix="$" />
              </TableCell>
            </TableRow>

            <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} tabIndex={-1}>
              <TableCell component="th" id={1} scope="row" align="left">
                <Link color="secondary" to="">
                  041201233412
                </Link>
              </TableCell>
              <TableCell align="left">Producto 4</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="left">
                <OrderStatus status={"Rechazado"} />
              </TableCell>
              <TableCell align="right">
                <NumberFormat value={"400"} displayType="text" thousandSeparator prefix="$" />
              </TableCell>
            </TableRow>

            <TableRow hover role="checkbox" sx={{ "&:last-child td, &:last-child th": { border: 0 } }} tabIndex={-1}>
              <TableCell component="th" id={1} scope="row" align="left">
                <Link color="secondary" to="">
                  041201233492
                </Link>
              </TableCell>
              <TableCell align="left">Producto 5</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="left">
                <OrderStatus status={"Cancelado"} />
              </TableCell>
              <TableCell align="right">
                <NumberFormat value={"400"} displayType="text" thousandSeparator prefix="$" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
