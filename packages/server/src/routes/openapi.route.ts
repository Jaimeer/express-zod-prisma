import path from 'path'
import { type Routing, z, ServeStatic } from 'express-zod-api'
import { jsonEndpointFactory } from '../factories/jsonEndpointFactory'

const openapiJsonEndpoint = (openApiJson: string) =>
  jsonEndpointFactory.build({
    method: 'get',
    input: z.object({}),
    output: z.object({ json: z.string() }),
    handler: async () => ({ json: openApiJson || '' }),
  })

const openapiRedocEndpoint = new ServeStatic(path.join(__dirname, '../../assets/redoc.html'), {
  dotfiles: 'deny',
  index: false,
  redirect: false,
})

const routing = (openApiJson: string): Routing => ({
  '': openapiRedocEndpoint,
  json: openapiJsonEndpoint(openApiJson),
})

export default routing
