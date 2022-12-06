import { Container } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { CategoriesAPI } from "@/services/categoriesAPI";
import { useNavigate } from "react-router-dom";

export default function NewCategory() {
  const navigate = useNavigate();

  const handleNew = async (stock) => {
    const res = await CategoriesAPI.create(stock);
    if (res.id) {
      navigate("/categorias");
    }
  };

  return (
    <Container sx={{ pt: 4 }}>
      <CategoryForm handleNew={handleNew} />
    </Container>
  );
}
