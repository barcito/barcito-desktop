import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

const url = `/products/${localStorage.getItem('barcito')}`;

export const ProductsAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
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

  update: async function (id, product, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "PATCH",
      data: product,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (product, cancel = false) {
    const response = await api.request({
      url: url,
      method: "POST",
      data: {...product, barcitoId: localStorage.getItem('barcito')},
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
  },

  updateImage: async function (id, productImg, cancel = false) {
    const response = await api.request({
      url: `/products/image-update/${id}`,
      method: 'PATCH',
      headers: {'Content-Type': 'multipart/form-data'},
      data: productImg,
      signal: cancel ? cancelApiObject[this.updateImage.name].handleRequestCancellation().signal : undefined,
    });

    if(response.status === 200){
      return response.data
    }

    return false
  }
}

const cancelApiObject = defineCancelApiObject(ProductsAPI)