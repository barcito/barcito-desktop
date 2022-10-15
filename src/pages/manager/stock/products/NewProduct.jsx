import { Container } from '@mui/material';
import ProductForm from './ProductForm';
import { ProductsAPI } from '@/services/productsAPI';
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {

    const navigate = useNavigate();

    const handleNew = async ({ product }) => {
        const res = await ProductsAPI.create(product);
        if(res.id){
            navigate('/stock/productos');
        }
    }

    return (
        <Container sx={{ pt: 4 }}>
            <ProductForm handleNew={handleNew} />
        </Container>
    );
}