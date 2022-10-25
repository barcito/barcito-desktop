import { Stack, Typography } from "@mui/material";
import Dot from "@/components/Dot";

const OrderStatus = ({ status, variant = "string" }) => {
    let color;

    switch (status) {
        case "Pendiente":
            color = "warning";
            break;
        case "Entregado":
            color = "success";
            break;
        case "Rechazado":
            color = "error";
            break;
        case "Cancelado":
            color = "secondary";
            break;
        case "Listo":
            color = "primary";
            break;
        default:
            color = "primary";
            title = "None";
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography variant={variant}>{status}</Typography>
        </Stack>
    );
};

export default OrderStatus;