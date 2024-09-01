import axios from 'axios'

function api() {
  return axios.create({
    baseURL: 'https://status.neuralgeneration.com',
    params: {
      appid: import.meta.env.VITE_API_TOKEN,
      lang: 'ru',
    },
  })
}

export default {
  getCurrency: () => api().get('/api/currency'),
}
