import { Container } from '@mui/material';
import { SuppliesAPI } from '@/services/suppliesAPI';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import SupplyForm from './SupplyForm';

export default function EditSupply() {
    const params = useParams();
    const client = useQueryClient();
    const { data, isLoading } = useQuery(['supply', params.supplyId], () => SuppliesAPI.get(params.supplyId));

    const mutation = useMutation(
        ({ id, supply }) => {
            if (supply) {
                return SuppliesAPI.update(id, supply);
            }
            /* return SuppliesAPI.delete(id); */
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['supply']);
                alert('Supply edited');
            }
        }
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <SupplyForm supply={data} mutation={mutation} />
        </Container>
    );
}