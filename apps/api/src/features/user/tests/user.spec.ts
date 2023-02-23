import { it, expect, describe } from 'vitest'
import { client } from '../../../../test/client'
import { PaginateResponse } from '../../../dto/response.dto'
import { Status } from '../../status/status.service'
import { User } from '../user.service'

describe('Users', async () => {
  it('list', async () => {
    const response = await client.provide('get', '/v1/users', {})

    expect(response).toBeSuccess<PaginateResponse<User>>({
      items: [{ id: 'default', name: 'From middleware' }],
      totalItems: 1,
    })
  })

  it('get', async () => {
    const response = await client.provide('get', '/v1/users/:userId', { userId: 'custom' })

    expect(response).toBeSuccess<User>({
      id: 'custom',
      name: 'From middleware',
    })
  })

  it('create', async () => {
    const response = await client.provide('post', '/v1/users/create', { name: 'testName' })

    expect(response).toBeSuccess<User>({
      id: 'new',
      name: 'testName',
    })
  })

  it('update', async () => {
    const response = await client.provide('patch', '/v1/users/:userId/update', {
      userId: 'custom',
      name: 'testName',
    })

    expect(response).toBeSuccess<User>({
      id: 'update',
      name: 'testName',
    })
  })

  it('delete', async () => {
    const response = await client.provide('delete', '/v1/users/:userId/delete', {
      userId: 'custom',
    })

    expect(response).toBeSuccess<Status>({
      status: 'deleted',
    })
  })
})
