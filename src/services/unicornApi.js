import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_CRUDCRUD_BASE_URL,
})

export async function fetchUnicorns() {
  const { data } = await api.get('/')
  return data
}

export async function createUnicorn(payload) {
  const { data } = await api.post('/', payload)
  return data
}

export async function updateUnicorn(id, payload) {
  const { data } = await api.put(`/${id}`, payload)
  return data
}

export async function deleteUnicorn(id) {
  await api.delete(`/${id}`)
}


