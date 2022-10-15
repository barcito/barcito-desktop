import { Container } from '@mui/material';
import { ProductsAPI } from '@/services/productsAPI';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ProductForm from './ProductForm';

export default function EditProduct() {
    const params = useParams();
    const client = useQueryClient();
    const { data, isLoading } = useQuery(['product', params.productId], () => ProductsAPI.get(params.productId));

    const mutation = useMutation(
        ({ id, product }) => {
            if (product) {
                return ProductsAPI.update(id, product);
            }
            /* return ProductsAPI.delete(id); */
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['product']);
                alert('Product edited');
            }
        }
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <ProductForm product={data} mutation={mutation} />
        </Container>
    );
}