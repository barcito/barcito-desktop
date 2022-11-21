import { Container } from "@mui/material";
import { ProductsAPI } from "@/services/productsAPI";
import { StockList } from "@/components/stock-list-table/StockList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { id: "description", label: "Descripcion", alignCenter: false },
  { id: "available", label: "Disponible", alignCenter: true },
  { id: "finalSellPrice", label: "Precio Final", alignCenter: true },
  { id: "associatedSellPrice", label: "Precio Socio", alignCenter: true },
  { id: "productToStock", label: "Stock utilizado", alignCenter: true },
  { id: "categories", label: "Categorias", alignCenter: true },
  { id: "updatedAt", label: "Últ. cambio", alignCenter: true },
];

export default function ProductList() {
  const client = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["products"], async () => ProductsAPI.getAll());

  const handleNew = () => {
    navigate("/productos/nuevo");
  };

  const handleEdit = (id) => {
    navigate(`/productos/editar/${id}`);
  };

  if (isLoading) {
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
