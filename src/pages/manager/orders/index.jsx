import { useQuery } from "react-query";
import { OrdersAPI } from "@/services/ordersAPI";
import { Container, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import OrderList from "@/components/order-list-table/OrderList";
import { useState } from "react";

const TABLE_HEAD = [
    { id: "code", label: "Código de retiro", alignCenter: false },
    { id: "createdAt", label: "Fecha y Hora", alignCenter: true },
    { id: "user", label: "Usuario", alignCenter: true },
    { id: "status", label: "Estado", alignCenter: false },
    { id: "amount", label: "Monto", alignCenter: true },
];

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default function Orders() {

    const {data: orders, isLoading} = useQuery(['orders'], () => OrdersAPI.getAll());

    const [value, setValue] = useState("All");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleNew = () => {
        console.log('new');
    }

    if(isLoading){
        return <p>Loading...</p>;
    }

    const tabbedOrders = value === "All" || !orders ? orders : orders.filter( (order) => order.status === value );

    return (
        <Container sx={{ pt: 4 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Orders tabs">
                        <Tab label="Todos" value="All" />
                        <Tab label="Pendientes" value="Pendiente" />
                        <Tab label="Preparados" value="Preparado" />
                        <Tab label="Entregados" value="Entregado" />
                        <Tab label="Cancelados" value="Cancelado" />
                        <Tab label="Rechazados" value="Rechazado" />
                    </TabList>
                </Box>
                <OrderList
                    orderList={tabbedOrders}
                    tableHead={TABLE_HEAD}
                    handleNew={handleNew}
                />
            </TabContext>
        </Container>
    );
}
