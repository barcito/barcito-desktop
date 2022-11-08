import { Navigate, useNavigate } from "react-router-dom";
import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AuthAPI = {
    signUp: async function(userData, cancel = false){
        const response = await api.request({
            url: `/auth/signup`,
            method: 'POST',
            data: userData,
            signal: cancel ? cancelApiObject[this.signUp.name].handleRequestCancellation().signal : undefined,
        });
        if(response.status === 201){
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("roles", response.data.roles);
            localStorage.setItem("academic-unit", response.data.academicUnit);
        }
        return response.data;
    },

    signIn: async function(credentials, cancel = false){
        const response = await api.request({
            url: `/auth/signin`,
            method: 'POST',
            data: credentials,
            signal: cancel ? cancelApiObject[this.signIn.name].handleRequestCancellation().signal : undefined,
        });

        if(response.status === 201){
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("roles", response.data.roles);
            localStorage.setItem("academic-unit", response.data.academicUnit);
            if(response.data.barcitoId){
                localStorage.setItem("barcito", response.data.barcitoId);
            }
        }

        return response.data;
    },

    signOut: async function (cancel = false) {
        localStorage.removeItem("email");
        localStorage.removeItem("roles");
        const response = await api.request({
          url: "/auth/logout",
          method: "GET",
          signal: cancel ? cancelApiObject[this.signOut.name].handleRequestCancellation().signal : undefined,
        });

        /* if(response.status === 200){
            localStorage.removeItem("email");
            localStorage.removeItem("roles");
        } */
    },

    refresh: async function (cancel = false) {
        await api.request({
            url: "/auth/refresh",
            method: "GET",
            signal: cancel ? cancelApiObject[this.refresh.name].handleRequestCancellation().signal : undefined,
        })
    }
}

// defining the cancel API object for AuthAPI
const cancelApiObject = defineCancelApiObject(AuthAPI);