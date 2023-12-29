import { BACKEND_HOST } from './constants'

export const get = async (url: string, params?: object) => {
  try {
    const res = await fetch(`${BACKEND_HOST}/${url}`,
      {
        method: "GET",
        // next: { tags: ['list-users'] }
      }
    )
    console.log(`${BACKEND_HOST}/${url}`)
    return res
  } catch (err) {
    console.error(err)
    return Promise.reject(err)
  }
}

// export const post = async (url: string, data: object) => {
//   try {
//     const res = await instance.post(url, data)
//     return res
//   } catch (err) {
//     console.error(err)
//     return Promise.reject(err)
//   }
// }

// export const put = async (url: string, data: object) => {
//   try {
//     const res = await instance.put(url, data)
//     return res
//   } catch (err) {
//     console.error(err)
//     return Promise.reject(err)
//   }
// }

// export const remove = async (url: string, params?: object) => {
//   try {
//     const res = await instance.delete(url, { params })
//     return res
//   } catch (err) {
//     console.error(err)
//     return Promise.reject(err)
//   }
// }
