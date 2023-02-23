import { type Routing } from 'express-zod-api'
import statusRouting from './features/status/status.router'
import userRouting from './features/user/user.router'

const routing: Routing = {
  v1: {
    '': statusRouting,
    users: userRouting,
  },
}

export default routing
