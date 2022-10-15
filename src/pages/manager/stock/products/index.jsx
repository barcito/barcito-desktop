import { useState } from "react";
import { Container } from "@mui/material";
import { ProductsAPI } from "@/services/productsAPI";
import StockList from "@/components/stock-list-table/StockList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { id: "description", label: "Descripcion", alignCenter: false },
  { id: "buyPrice", label: "Costo", alignCenter: true },
  { id: "stock", label: "Stock", alignCenter: true },
  { id: "lowStockWarning", label: "Advertencia", alignCenter: true },
  { id: "lastRestock", label: "Ult. compra", alignCenter: true },
  { id: "finalSellPrice", label: "Precio Final", alignCenter: true },
  { id: "associatedSellPrice", label: "Precio Socio", alignCenter: true },
  { id: "supplies", label: "Insumos", alignCenter: true },
];

export default function ProductList() {

  const client = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['products'], async () => ProductsAPI.getAll());

  /* const [productOnAction, setProductOnAction] = useState({}); */

  const handleNew = () => {
    navigate('/stock/producto/nuevo');
  }

  const handleEdit = (id) => {
    navigate(`/stock/producto/editar/${id}`);
  }

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
        /* actionTwo={handleDelete} */
      />
      {/* <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} /> */}
    </Container>
  );
}
