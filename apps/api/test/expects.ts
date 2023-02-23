import { expect } from 'vitest'
import { SuccessResponse } from '../src/dto/response.dto'

interface CustomMatchers<R = unknown> {
  toBeSuccess<E extends {} | any[]>(expected: E): void
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

expect.extend({
  toBeSuccess<T>(received: unknown, expected: T) {
    try {
      console.log('toBeSuccess', received, expected)
      expect(received).toMatchObject({
        status: 'success',
        data: expected,
      } satisfies SuccessResponse<T>)
      return { pass: true, message: () => `success` }
    } catch (e: any) {
      return { pass: false, message: () => e.message }
    }
  },
})
