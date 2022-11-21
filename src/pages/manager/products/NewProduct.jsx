import { Container } from "@mui/material";
import ProductForm from "./ProductForm";
import { ProductsAPI } from "@/services/productsAPI";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();

  const handleNew = async (product) => {
    const formData = new FormData();
    formData.append("product_img", product.product_img);
    delete product.product_img;
    const response = await ProductsAPI.create(product);
    if (response.id) {
      await ProductsAPI.updateImage(response.id, formData);
      navigate("/productos");
    }
  };

  return (
    <Container sx={{ pt: 4 }}>
      <ProductForm handleNew={handleNew} />
    </Container>
  );
}
