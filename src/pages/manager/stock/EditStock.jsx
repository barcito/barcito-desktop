import { Container } from "@mui/material";
import { StockAPI } from "@/services/stockAPI";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import StockForm from "./StockForm";

export default function EditStock() {
  const params = useParams();
  const client = useQueryClient();
  const { data, isLoading } = useQuery(["stock", params.stockId], () => StockAPI.get(params.stockId));

  const mutation = useMutation(
    ({ id, stock }) => {
      if (stock) {
        return StockAPI.update(id, stock);
      }
      /* return StockAPI.delete(id); */
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["stock"]);
        alert("Stock edited");
      },
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <StockForm stock={data} mutation={mutation} />
    </Container>
  );
}
