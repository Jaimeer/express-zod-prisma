import { it, expect, describe } from 'vitest'
import { client } from '../../../../test/client'
import { type Status } from '../status.service'

describe('Status', async () => {
  it('Get', async () => {
    const response = await client.provide('get', '/v1', {})

    expect(response).toBeSuccess<Status>({
      status: 'ok',
    })
  })
})
