import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const ApplicationsAPI = {

  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/applications/${id}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/applications",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  update: async function (id, data, cancel = false) {
    const response = await api.request({
      url: `/applications/${id}`,
      method: "PATCH",
      data: data,
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

}

const cancelApiObject = defineCancelApiObject(ApplicationsAPI)