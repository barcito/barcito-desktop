import { useQuery } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";
import { Container } from "@mui/material";
import OrderList from "@/components/order-list-table/OrderList";

const TABLE_HEAD = [
    { id: "code", label: "Código de retiro", alignCenter: false },
    { id: "date", label: "Fecha", alignCenter: true },
    { id: "user", label: "Usuario", alignCenter: true },
    { id: "status", label: "Estado", alignCenter: false },
    { id: "amount", label: "Monto", alignCenter: true },
  ];

export default function Orders() {

    const {data: orders, isLoading} = useQuery(['orders'], () => OrdersAPI.getAll());

    if(isLoading){
        return <p>Loading...</p>;
    }

    const handleNew = () => {
        console.log('new');
    }

    return (
        <Container sx={{ pt: 4 }}>
            <OrderList
                orderList={orders}
                tableHead={TABLE_HEAD}
                handleNew={handleNew}
            />
        </Container>
    );
}
