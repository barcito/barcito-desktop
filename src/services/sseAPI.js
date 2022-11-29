import eventBus from "@/utils/eventBus";
import { api } from "./configs/axiosConfigs";

export const SseAPI = {
    newOrderStatus: async function(userId, message){
        const response = await api.request({
            url: `sse/orderStatus/${userId}`,
            method: "POST",
            data: message
        });

        return response;
    },

    subscribe: function(barcitoId) {
        const subscription = new EventSource(`http://192.168.0.6:3000/api/sse/newOrder/${barcitoId}`, { withCredentials: true });

        subscription.addEventListener("open", (event) => {
            console.log("SSE connection opened");
        })
    
        subscription.addEventListener("message", async (event) => {
            const data = JSON.parse(event.data);
            if(data.type === "close"){
                subscription.close();
            }
            if(data.type === "message"){
                eventBus.dispatch("notification", data);
            }
        })
    
        subscription.addEventListener("error", (event) => {
            if (event.type === "error") {
                console.error("Connection error:", event.message);
            } else if (event.type === "exception") {
                console.error("Error:", event.message, event.error);
            }
        });
    
        subscription.addEventListener("close", (event) => {
            console.log("Close SSE connection.");
        });
    }
}