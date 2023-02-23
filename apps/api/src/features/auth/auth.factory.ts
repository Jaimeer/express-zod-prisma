import { defaultEndpointsFactory } from 'express-zod-api'
import { authMiddleware } from './auth.middleware'

export const authEndpointsFactory = defaultEndpointsFactory.addMiddleware(authMiddleware)
