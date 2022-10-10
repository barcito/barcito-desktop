import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const ProductsAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/products/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data;
  },

  getByEmail: async function (email, cancel = false) {
    const response = await api.request({
      url: `/products/email/${email}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })
    // returning the product returned by the API
    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/products/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, product, cancel = false) {
    const response = await api.request({
      url: `/products/${id}`,
      method: "PATCH",
      data: product,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (product, cancel = false) {
    const response = await api.request({
      url: `/products`,
      method: "POST",
      data: product,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/products/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(ProductsAPI)