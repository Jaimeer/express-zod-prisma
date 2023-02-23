import { test, expect, describe } from 'vitest'
import { client } from '../../../../test/client'
import { type Status } from '../status.service'

describe('Status', async () => {
  test('Get should respond successfully', async () => {
    const responseMock = await client.provide('get', '/v1', {})

    expect(responseMock).toBeSuccess({
      status: 'ok',
    } satisfies Status)
  })
})
