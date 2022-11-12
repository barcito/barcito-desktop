import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

const url = `/stock/${localStorage.getItem('barcito')}`;

export const StockAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: url,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getAllConsumables: async function (cancel = false) {
    const response = await api.request({
      url: `${url}/consumables`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getAllSupplies: async function (cancel = false) {
    const response = await api.request({
      url: `${url}/supplies`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, stock, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "PATCH",
      data: stock,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (stock, cancel = false) {
    const response = await api.request({
      url: url,
      method: "POST",
      data: stock,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(StockAPI)