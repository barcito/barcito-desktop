import { Container, Divider, Grid, Stack, Typography, Card, Box, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";
import MainCard from "@/components/MainCard";
import OrderStatus from "@/components/order-list-table/OrderStatus";

export default function OrderDetails() {
    const params = useParams();

    const { data: order, isLoading } = useQuery(['order'], () => OrdersAPI.getByCode(params.orderCode));

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <MainCard sx={{ maxWidth: '65%' }} >
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Typography variant="h4">
                            Pedido #{order.code}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <OrderStatus status={order.status} variant="h4" />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4">
                            {order.date}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Grid container>
                    <Grid item xs={6} display="flex" justifyContent="center">
                        <Stack>
                            <Typography variant="h4">
                                Cliente
                            </Typography>
                            <Typography variant="string">
                                Cosme Fulanito
                                <br />
                                2995863776
                                <br />
                                email@email.com
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} display="flex" alignItems="center">
                        <Typography variant="h4">
                            Total a pagar ${order.amount}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Productos
                        </Typography>
                    </Grid>
                {order.products.map((prod) => (
                    <Grid item xs={12} key={prod.id}>
                        <Card variant="outlined" sx={{ display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={prod.product.imagePath}
                                alt={prod.product.description}
                            />
                            <CardContent sx={{ width: '100%'}}>
                                <Stack direction="row" spacing={3} justifyContent="space-around" alignItems="center">
                                    <Typography component="div" variant="h5">
                                        {`${prod.product.description} x${prod.quantity}`}
                                    </Typography>
                                    <Stack>
                                        <Typography component="div" variant="subtitle1">
                                            Precio unitario: 
                                        </Typography>
                                        <Typography component="div" variant="h4" >
                                            ${prod.lockedPrice}
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                    <Typography component="div" variant="subtitle1">
                                            Precio total: 
                                        </Typography>
                                        <Typography component="div" variant="h4" >
                                            ${prod.lockedPrice * prod.quantity}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                </Grid>
                <Divider sx={{ my: 3 }} />
                Acciones
            </MainCard>
        </Container>
    );
}