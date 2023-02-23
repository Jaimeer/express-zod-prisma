import { defaultEndpointsFactory, z, type Routing } from 'express-zod-api'
import { authMiddleware } from '../auth/auth.middleware'
import { authEndpointsFactory } from '../auth/auth.factory'
import { zStatus } from '../status/status.router'
import { UserService } from './user.service'

const zUser = z.object({
  id: z.string(),
  name: z.string(),
})

const usersEndpoint = authEndpointsFactory.build({
  method: 'get',
  tag: 'users',
  input: z.object({}),
  output: z.object({
    items: z.array(zUser),
    totalItems: z.number().positive().int(),
  }),
  handler: async ({ options, logger }) => {
    logger.debug('List:', { options: JSON.stringify(options) })
    return await UserService.list(options.user)
  },
})

const userEndpoint = authEndpointsFactory.build({
  method: 'get',
  tag: 'users',
  input: z.object({
    userId: z.string(),
  }),
  output: zUser,
  handler: async ({ input, options, logger }) => {
    logger.debug('Get:', { options: JSON.stringify(options) })
    return await UserService.get({ ...options.user, id: input.userId })
  },
})

const userCreateEndpoint = authEndpointsFactory.build({
  method: 'post',
  tag: 'users',
  input: z.object({
    name: z.string(),
  }),
  output: zUser,
  handler: async ({ input, options, logger }) => {
    logger.debug('Create:', { options: JSON.stringify(options), input: JSON.stringify(input) })
    return await UserService.create(input)
  },
})

const userUpdateEndpoint = authEndpointsFactory.build({
  method: 'patch',
  tag: 'users',
  input: z.object({
    userId: z.string(),
    name: z.string(),
  }),
  output: zUser,
  handler: async ({ input, options, logger }) => {
    logger.debug('Update:', { options: JSON.stringify(options), input: JSON.stringify(input) })
    return await UserService.update({ ...options.user, id: input.userId }, input)
  },
})

const userRemoveEndpoint = authEndpointsFactory.build({
  method: 'delete',
  tag: 'users',
  input: z.object({
    userId: z.string(),
  }),
  output: zStatus,
  handler: async ({ options, logger }) => {
    logger.debug('Remove:', { options: JSON.stringify(options) })
    return await UserService.remove(options.user)
  },
})

const routing: Routing = {
  '': usersEndpoint,
  create: userCreateEndpoint,
  ':userId': {
    '': userEndpoint,
    update: userUpdateEndpoint,
    delete: userRemoveEndpoint,
  },
}

export default routing
