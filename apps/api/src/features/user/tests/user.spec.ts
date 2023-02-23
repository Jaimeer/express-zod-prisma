import { test, expect, describe } from 'vitest'
import { client } from '../../../../test/client'
import { PaginateResponse } from '../../../dto/response.dto'
import { User } from '../user.service'

describe('Users', async () => {
  test('list should respond successfully', async () => {
    const responseMock = await client.provide('get', '/v1/users', {})

    expect(responseMock).toBeSuccess({
      items: [{ id: 'default', name: 'From middleware' }],
      totalItems: 1,
    } satisfies PaginateResponse<User>)
  })

  test('get should respond successfully', async () => {
    const responseMock = await client.provide('get', '/v1/users/:id', { id: 'custom' })

    expect(responseMock).toBeSuccess({
      id: 'custom',
      name: 'From middleware',
    } satisfies User)
  })
})
