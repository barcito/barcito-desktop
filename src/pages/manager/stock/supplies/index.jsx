import { useState } from "react";
import { Container } from "@mui/material";
import { SuppliesAPI } from "@/services/suppliesAPI";
import StockList from "@/components/stock-list-table/StockList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { id: "description", label: "Descripcion", alignCenter: false },
  { id: "cost", label: "Costo", alignCenter: true },
  { id: "stock", label: "Stock", alignCenter: true }
];

export default function SuppliesList() {

  const client = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['supplies'], async () => SuppliesAPI.getByBarcito());

  /* const [supplyOnAction, setSupplyOnAction] = useState({}); */

  const handleNew = () => {
    navigate('/stock/insumos/nuevo');
  }

  const handleEdit = (id) => {
    navigate(`/stock/insumos/editar/${id}`);
  };

  if(isLoading){
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <StockList 
        stockList={data}
        tableHead={TABLE_HEAD}
        handleNew={handleNew}
        handleEdit={handleEdit}
      />
      {/* <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} /> */}
    </Container>
  );
}
