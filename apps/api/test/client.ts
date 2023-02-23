import { ExpressZodAPIClient } from 'clients/clientApi'
import './expects'

const domain = 'http://localhost:5000'

export const client = new ExpressZodAPIClient(async (method, path, params) => {
  const searchParams = method === 'get' ? `?${new URLSearchParams(params)}` : ''
  const response = await fetch(`${domain}${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers: method === 'get' ? undefined : { 'Content-Type': 'application/json' },
    body: method === 'get' ? undefined : JSON.stringify(params),
  })
  return response.json()
})
