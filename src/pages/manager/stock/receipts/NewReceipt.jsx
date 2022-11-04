import { useNavigate } from "react-router-dom";
import { ReceiptsAPI } from "@/services/receiptsAPI";
import { Container } from "@mui/material";
import ReceiptForm from "./ReceiptForm";
import { useQuery } from "react-query";
import { SuppliesAPI } from "@/services/suppliesAPI";
import { ProductsAPI } from "@/services/productsAPI";

export default function NewReceipt(){
    const navigate = useNavigate();
    const { data: products, isLoading: isLoadingProducts } = useQuery(['products'], () => ProductsAPI.getAll());
    const { data: supplies, isLoading: isLoadingSupplies } = useQuery(['supplies'], () => SuppliesAPI.getAll());

    const handleNew = async ({ receipt }) => {
        const res = await ReceiptsAPI.create(receipt);
        if(res.id){
            navigate('/stock/recibos');
        }
    }
    
    if( isLoadingSupplies || isLoadingProducts ){
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <ReceiptForm handleNew={handleNew} prods={products} supps={supplies} />
        </Container>
    )
}