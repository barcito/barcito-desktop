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
        async ({ id, product }) => {
            if (product.product_img) {
                const formData = new FormData();
                formData.append('product_img', product.product_img);
                delete product.product_img;
                await ProductsAPI.updateImage(id, formData);
            }
            return ProductsAPI.update(id, product);
        },
        {
            onSuccess: () => {
                alert('Product edited');
                client.invalidateQueries(['product']);
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