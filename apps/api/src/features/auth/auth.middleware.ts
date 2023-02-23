import { createMiddleware, z } from 'express-zod-api'
import { type User } from '../user/user.service'

export const authMiddleware = createMiddleware({
  input: z.object({}), // means no inputs
  middleware: async ({ request }) => {
    // throw new Error('Unauthorized')
    const user = { id: 'default', name: 'From middleware' } satisfies User
    return { user }
  },
})
