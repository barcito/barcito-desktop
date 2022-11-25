import { useState } from "react";
import { Container, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { StockAPI } from "@/services/stockAPI";
import { StockList as StockTable } from "@/components/stock-list-table/StockList";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { id: "description", label: "Descripcion", alignCenter: false },
  { id: "cost", label: "Costo", alignCenter: true },
  { id: "quantity", label: "Cantidad", alignCenter: true },
  { id: "categories", label: "Categorías", alignCenter: true },
  { id: "updatedAt", label: "Últ. cambio", alignCenter: true },
];

export default function StockList() {
  const navigate = useNavigate();

  const { data: stock, isLoading } = useQuery(["stock"], async () => StockAPI.getAll());

  const [value, setValue] = useState("All");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNew = () => {
    navigate(`/stock/nuevo`);
  };

  const handleEdit = (id) => {
    navigate(`/stock/editar/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const tabbedStock = value === "All" || !stock ? stock : stock.filter((item) => item.type === value);

  return (
    <Container sx={{ pt: 4 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Stock tabs">
            <Tab label="Todo" value="All" />
            <Tab label="Consumibles" value="Consumible" />
            <Tab label="Insumos" value="Insumo" />
          </TabList>
        </Box>
        <StockTable stockList={tabbedStock} tableHead={TABLE_HEAD} handleNew={handleNew} handleEdit={handleEdit} />
      </TabContext>
      {/* <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} /> */}
    </Container>
  );
}
