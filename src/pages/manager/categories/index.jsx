import { Container, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import CategoriesList from "@/components/categories-list-table/CategoriesList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CategoriesAPI } from "@/services/categoriesAPI";
import CategoryDialog from "./CategoryDialog";
import ConfirmDialog from "@/components/ConfirmDialog";

const TABLE_HEAD = [
  { id: "description", label: "Descripcion", alignCenter: false },
  { id: "type", label: "Tipo", alignCenter: true },
  { id: "createdAt", label: "Fecha creación", alignCenter: true },
];

export default function Categories() {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery(["categories"], () => CategoriesAPI.getAll());

  const [value, setValue] = useState("All");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNew = () => {
    navigate(`/categorias/nueva`);
  };

  const handleEdit = (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const tabbedCategories = value === "All" || !categories ? categories : categories.filter((category) => category.type === value);

  return (
    <Container sx={{ pt: 4 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Orders tabs">
            <Tab label="Todas" value="All" />
            <Tab label="Consumible" value="Consumible" />
            <Tab label="Insumo" value="Insumo" />
            <Tab label="Producto" value="Producto" />
          </TabList>
        </Box>
        <CategoriesList categoriesList={tabbedCategories} tableHead={TABLE_HEAD} handleNew={handleNew} handleEdit={handleEdit} />
      </TabContext>
    </Container>
  );
}
