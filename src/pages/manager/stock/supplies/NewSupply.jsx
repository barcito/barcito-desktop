import { Container } from '@mui/material';
import SupplyForm from './SupplyForm';
import { SuppliesAPI } from '@/services/suppliesAPI';
import { useNavigate } from 'react-router-dom';

export default function NewSupply() {

    const navigate = useNavigate();

    const handleNew = async ({ supply }) => {
        const res = await SuppliesAPI.create(supply);
        if(res.id){
            navigate('/stock/insumos');
        }
    }

    return (
        <Container sx={{ pt: 4 }}>
            <SupplyForm handleNew={handleNew} />
        </Container>
    );
}