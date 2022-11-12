import { useNavigate } from "react-router-dom";
import { ReceiptsAPI } from "@/services/receiptsAPI";
import { Container } from "@mui/material";
import ReceiptForm from "./ReceiptForm";
import { useQuery } from "react-query";
import { StockAPI } from "@/services/stockAPI";

export default function NewReceipt(){
    const navigate = useNavigate();
    const { data: stock, isLoading: isLoading } = useQuery(['stock'], () => StockAPI.getAll());

    const handleNew = async (receipt) => {
        const formData = new FormData();
        formData.append('receipt_doc', receipt.receipt_doc);
        delete receipt.receipt_doc;
        console.log(receipt);
        const res = await ReceiptsAPI.create(receipt);
        if(res.id){
            await ReceiptsAPI.updateDoc(res.id, formData);
        }
        navigate('/recibos');
    }
    
    if( isLoading ){
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <ReceiptForm handleNew={handleNew} stockList={stock} />
        </Container>
    )
}