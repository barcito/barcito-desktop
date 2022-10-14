import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const CategoriesAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/categories/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/categories/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, category, cancel = false) {
    const response = await api.request({
      url: `/categories/${id}`,
      method: "PATCH",
      data: category,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (category, cancel = false) {
    const response = await api.request({
      url: `/categories`,
      method: "POST",
      data: category,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/categories/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(CategoriesAPI)