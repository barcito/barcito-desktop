import { Container, Divider, Grid, Stack, Typography, Card, CardMedia, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";
import MainCard from "@/components/MainCard";
import OrderStatus from "@/components/order-list-table/OrderStatus";
import { useState } from "react";

export default function OrderDetails() {
    const client = useQueryClient();
    const params = useParams();
    const { data: order, isLoading } = useQuery(['order'], () => OrdersAPI.getByCode(params.orderCode));
    const [status, setStatus] = useState("");
    const statusOptions = ['Rechazado', 'Cancelado', 'Pendiente', 'Preparado', 'Entregado'];

    const mutation = useMutation(
        () => {
            return OrdersAPI.update(order.id, {status: status});
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['order']);
            }
        }
    )

    const handleSave = () => {
        mutation.mutate();
    }

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
                            {new Date(order.createdAt).toLocaleString()}
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
                                <CardContent sx={{ width: '100%' }}>
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
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12}>
                        <Typography component="div" variant="h5">
                            Modificar estado:
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Estado</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                label="Estado"
                                value={status}
                                onChange={(e)=>setStatus(e.target.value)}
                            >
                                {statusOptions.map( (option) => 
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={handleSave}>Guardar</Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Container>
    );
}