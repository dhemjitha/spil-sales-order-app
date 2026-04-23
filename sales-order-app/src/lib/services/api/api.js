const BASE_URL = 'https://localhost:7266/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Something went wrong')
  }

  if (response.status === 204) return null
  return response.json()
}

export const clientsApi = {
  getAll: () => fetch(`${BASE_URL}/Clients`).then(handleResponse),
  getById: (id) => fetch(`${BASE_URL}/Clients/${id}`).then(handleResponse),
}

export const itemsApi = {
  getAll: () => fetch(`${BASE_URL}/Items`).then(handleResponse),
}

export const salesOrdersApi = {
  getAll: () => fetch(`${BASE_URL}/SalesOrders`).then(handleResponse),
  getById: (id) => fetch(`${BASE_URL}/SalesOrders/${id}`).then(handleResponse),
  create: (data) => fetch(`${BASE_URL}/SalesOrders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  update: (id, data) => fetch(`${BASE_URL}/SalesOrders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  delete: (id) => fetch(`${BASE_URL}/SalesOrders/${id}`, {
    method: 'DELETE'
  }).then(handleResponse),
}