import { api } from "./configs/axiosConfigs";

export const SseAPI = {
    newOrderStatus: async function(userId, orderStatus){
        const response = await api.request({
            url: `sse/orderStatus/${userId}`,
            method: "POST",
            data: { message: `Estado de pedido: ${orderStatus}` }
        });

        return response;
    }
}