import path from 'path'
import fs from 'fs'
import { Client } from 'express-zod-api'
import { ServerFactory, type ServerConfig } from 'server'
import routing from './routing'

// Api server
const config: ServerConfig = {
  port: 5000,
  tags: {
    status: 'Status description',
    users: 'Users description',
  },
}

fs.writeFileSync(
  path.join(__dirname, '../../../packages/clients/clientApi.ts'),
  new Client(routing).print(),
  'utf-8'
)

export const app = new ServerFactory('Api', config, routing)
