import axios from 'axios'
import { BACKEND_HOST } from './constants'

const instance = axios.create({
  baseURL: BACKEND_HOST
})

instance.interceptors.request.use(
  config => {
    // config.headers = {
    //   Authorization: `Bearer ${userToken()}`,
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const get = async (url: string, params?: object) => {
  try {
    const res = await instance.get(url, params)
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export const post = async (url: string, data: object) => {
  try {
    const res = await instance.post(url, data)
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export const put = async (url: string, data: object) => {
  try {
    const res = await instance.put(url, data)
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

export const remove = async (url: string, params?: object) => {
  try {
    const res = await instance.delete(url, { params })
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}
