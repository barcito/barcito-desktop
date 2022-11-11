import { useQuery } from "react-query";
import { ReceiptsAPI } from "@/services/receiptsAPI";
import { Container } from "@mui/material";
import ReceiptList from "@/components/receipt-list-table/ReceiptList";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    { id: "ticket", label: "Nro. de recibo", alignCenter: false },
    { id: "date", label: "Fecha", alignCenter: true },
    { id: "amount", label: "Monto", alignCenter: true },
    { id: "receiptPath", label: "PDF", alignCenter: true },
];

export default function Receipts() {

    const navigate = useNavigate();

    const {data: receipts, isLoading} = useQuery(['receipts'], () => ReceiptsAPI.getByBarcito());

    if(isLoading){
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <ReceiptList
                receiptList={receipts}
                tableHead={TABLE_HEAD}
                handleNew={() => navigate('/stock/recibos/nuevo')}
            />
        </Container>
    );
}
