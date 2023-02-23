import { defaultEndpointsFactory, z, type Routing } from 'express-zod-api'
import { StatusService } from './status.service'

export const statusEndpoint = defaultEndpointsFactory.build({
  method: 'get',
  tag: 'status',
  input: z.object({}),
  output: z.object({
    status: z.string(),
  }),
  handler: async ({ options, logger }) => {
    logger.debug('Options:', options) // middlewares provide options
    return await StatusService.get()
  },
})

const routing: Routing = {
  '': statusEndpoint,
}

export default routing
