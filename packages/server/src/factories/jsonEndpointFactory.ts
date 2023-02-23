import { z, EndpointsFactory, createResultHandler, createApiResponse } from 'express-zod-api'

export const jsonEndpointFactory = new EndpointsFactory(
  createResultHandler({
    getPositiveResponse: () => createApiResponse(z.any(), 'application/json'),
    getNegativeResponse: () => createApiResponse(z.string(), 'text/plain'),
    handler: ({ response, error, output, logger }) => {
      if (error) {
        response.status(400).send(error.message)
        return
      }
      try {
        response.status(200).json(JSON.parse(output.json))
      } catch (err: any) {
        response.status(400).json(err.message)
      }
    },
  })
)
