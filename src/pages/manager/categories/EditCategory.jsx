import { Container } from "@mui/material";
import { CategoriesAPI } from "@/services/categoriesAPI";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CategoryForm from "./CategoryForm";

export default function EditCategory() {
  const params = useParams();
  const client = useQueryClient();
  const { data, isLoading } = useQuery(["categories", params.categoryId], () => CategoriesAPI.getAll());

  const mutation = useMutation(
    ({ id, stock }) => {
      if (stock) {
        return CategoriesAPI.update(id, stock);
      }
      /* return CategoriesAPI.delete(id); */
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["stock"]);
        alert("Categoria editada");
      },
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <CategoryForm category={data} mutation={mutation} />
    </Container>
  );
}
