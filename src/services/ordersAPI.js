import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const OrdersAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/orders/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/orders/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getByBarcito: async function (cancel = false) {
    const response = await api.request({
      url: `/orders/barcito/${localStorage.getItem('barcito')}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getByBarcito.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getByCode: async function (orderCode, cancel = false){
    const response = await api.request({
      url: `/orders/code/${orderCode}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getByCode.name].handleRequestCancellation().signal : undefined,
    });

    return response.data;
  },

  update: async function (id, order, cancel = false) {
    const response = await api.request({
      url: `/orders/${id}`,
      method: "PATCH",
      data: order,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (order, cancel = false) {
    const response = await api.request({
      url: `/orders`,
      method: "POST",
      data: {...order, barcitoId: localStorage.getItem('barcito')},
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/orders/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(OrdersAPI)