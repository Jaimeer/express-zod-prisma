import { type Routing } from 'express-zod-api'
import stausRouting from './features/status/status.router'
import userRouting from './features/user/user.router'

const routing: Routing = {
  v1: {
    '': stausRouting,
    users: userRouting,
  },
}

export default routing
