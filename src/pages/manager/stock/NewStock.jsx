import { Container } from "@mui/material";
import StockForm from "./StockForm";
import { StockAPI } from "@/services/stockAPI";
import { useNavigate } from "react-router-dom";

export default function NewStock() {
  const navigate = useNavigate();

  const handleNew = async (stock) => {
    const res = await StockAPI.create(stock);
    if (res.id) {
      navigate("/stock");
    }
  };

  return (
    <Container sx={{ pt: 4 }}>
      <StockForm handleNew={handleNew} />
    </Container>
  );
}
