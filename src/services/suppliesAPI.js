import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const SuppliesAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/supplies/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/supplies/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getByBarcito: async function (cancel = false) {
    const response = await api.request({
      url: `/supplies/barcito/${localStorage.getItem('barcito')}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getByBarcito.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, supply, cancel = false) {
    const response = await api.request({
      url: `/supplies/${id}`,
      method: "PATCH",
      data: supply,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (supply, cancel = false) {
    const response = await api.request({
      url: `/supplies`,
      method: "POST",
      data: {...supply, barcitoId: localStorage.getItem('barcito')},
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/supplies/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(SuppliesAPI)