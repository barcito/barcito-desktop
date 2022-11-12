import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import OrderForm from "./OrderForm";
import { useQuery } from "react-query";
import { ProductsAPI } from "@/services/productsAPI";
import { UserAPI } from "@/services/userAPI";
import { OrdersAPI } from "@/services/ordersAPI";

export default function NewOrder(){

    const navigate = useNavigate();
    const { data: products, isLoading: isLoadingProducts } = useQuery(['products'], () => ProductsAPI.getAll());
    const { data: users, isLoading: isLoadingUsers } = useQuery(['users'], () => UserAPI.getAll());

    const handleNew = async ( order ) => {
        const orderToSave = {
            ...order,
            products: order.products.map( (prod) => ({productId: prod.id, quantity: prod.quantity }) )
        }
        console.log(orderToSave);
        await OrdersAPI.create(orderToSave);
        navigate('/pedidos');
    }
    
    if( isLoadingUsers || isLoadingProducts ){
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <OrderForm handleNew={handleNew} prods={products} users={users} />
        </Container>
    )
}