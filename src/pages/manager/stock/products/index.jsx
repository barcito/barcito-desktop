import { useState } from "react";
import { Container } from "@mui/material";
import { ProductsAPI } from "../../../../services/productsAPI";
import StockList from "../../../../components/stock-list-table/StockList";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export default function Products() {

  const client = useQueryClient();

  const { data, isLoading } = useQuery(['products'], async () => ProductsAPI.getAll());

  const [productOnAction, setProductOnAction] = useState({});

  /* const [dialogOpen, setDialogOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation(
    (id) => {
      return UserAPI.delete(id);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['users']);
      }
    }
  );

  const handleNew = () => {
    
  }

  const handleDelete = (user) => {
    setUserOnAction(user);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    mutation.mutate({id: userOnAction.id, data: null});
    setDialogOpen(false);
  }; */

  if(isLoading){
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <StockList 
        stockList={data}
        tableHead={TABLE_HEAD}
        /*
        actionOne={handleNew}
        actionTwo={handleDelete}
        */
      />
      {/* <ConfirmDialog dialogOpen={dialogOpen} text={"¿Eliminar usuario?"} confirmAction={confirmDelete} closeDialog={setDialogOpen} /> */}
    </Container>
  );
}
