import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const BarcitoAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/barcitos/${id}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/barcitos/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  update: async function (id, barcito, cancel = false) {
    const response = await api.request({
      url: `/barcitos/${id}`,
      method: "PATCH",
      data: barcito,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    if(response.status === 200){
      return response.data
    }

    return false
  },

  create: async function (barcito, cancel = false) {
    await api.request({
      url: `/barcitos`,
      method: "POST",
      data: barcito,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })
  },

  delete: async function (id, cancel = false) {
    await api.request({
      url: `/barcitos/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })
  }
}

const cancelApiObject = defineCancelApiObject(BarcitoAPI)