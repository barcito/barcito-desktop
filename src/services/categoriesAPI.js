import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

const url = `/categories/${localStorage.getItem('barcito')}`;

export const CategoriesAPI = {
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

  getAllProducts: async function (cancel = false) {
    const response = await api.request({
      url: `${url}/products`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, category, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "PATCH",
      data: category,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (category, cancel = false) {
    const response = await api.request({
      url: url,
      method: "POST",
      data: {...category, barcitoId: localStorage.getItem('barcito')},
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

const cancelApiObject = defineCancelApiObject(CategoriesAPI)