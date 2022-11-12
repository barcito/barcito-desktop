import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

const url = `/receipts/${localStorage.getItem('barcito')}`;

export const ReceiptsAPI = {
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

  update: async function (id, receipt, cancel = false) {
    const response = await api.request({
      url: `${url}/${id}`,
      method: "PATCH",
      data: receipt,
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  create: async function (receipt, cancel = false) {
    const response = await api.request({
      url: url,
      method: "POST",
      data: receipt,
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

  updateDoc: async function (id, receiptDoc, cancel = false) {
    const response = await api.request({
      url: `${url}/document-update/${id}`,
      method: 'PATCH',
      headers: {'Content-Type': 'multipart/form-data'},
      data: receiptDoc,
      signal: cancel ? cancelApiObject[this.updateDoc.name].handleRequestCancellation().signal : undefined,
    });

    if(response.status === 200){
      return response.data
    }

    return false
  }
}

const cancelApiObject = defineCancelApiObject(ReceiptsAPI)