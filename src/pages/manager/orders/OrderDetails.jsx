import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";

export default function OrderDetails(){
    const params = useParams();
    
    const { data: order, isLoading } = useQuery(['order'], () => OrdersAPI.getByCode(params.orderCode));

    if(isLoading){
        return <p>Loading...</p>;
    }

    console.log(order);

    return(
        <Container sx={{ pt: 4 }}>
            
        </Container>
    );
}