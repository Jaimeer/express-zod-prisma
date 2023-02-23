import { defaultEndpointsFactory, z, type Routing } from 'express-zod-api'
import { authMiddleware } from '../auth/auth.middleware'
import { UserService } from './user.service'

const zUser = z.object({
  id: z.string(),
  name: z.string(),
})

export const usersEndpoint = defaultEndpointsFactory.addMiddleware(authMiddleware).build({
  method: 'get',
  tag: 'users',
  input: z.object({}),
  output: z.object({
    items: z.array(zUser),
    totalItems: z.number().positive().int(),
  }),
  handler: async ({ options, logger }) => {
    logger.debug('Options:', options) // middlewares provide options
    return await UserService.list(options.user)
  },
})

export const userEndpoint = defaultEndpointsFactory.addMiddleware(authMiddleware).build({
  method: 'get',
  tag: 'users',
  input: z.object({
    id: z.string(),
  }),
  output: zUser,
  handler: async ({ input, options, logger }) => {
    logger.debug('Options:', options) // middlewares provide options
    return await UserService.get({ ...options.user, id: input.id })
  },
})

const routing: Routing = {
  '': usersEndpoint,
  ':id': userEndpoint,
}

export default routing
