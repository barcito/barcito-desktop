import { api } from "./configs/axiosConfigs";

export const SseAPI = {
    newOrderStatus: async function(userId, message){
        const response = await api.request({
            url: `sse/orderStatus/${userId}`,
            method: "POST",
            data: message
        });

        return response;
    }
}