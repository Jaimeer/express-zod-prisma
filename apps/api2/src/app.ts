import path from 'path'
import fs from 'fs'
import { Client } from 'express-zod-api'
import { ServerFactory, type ServerConfig } from 'server'
import routing from './routing'

// Api2 server
const config: ServerConfig = {
  port: 5100,
  tags: {},
}

fs.writeFileSync(
  path.join(__dirname, '../../../packages/clients/clientMdm.ts'),
  new Client(routing).print(),
  'utf-8'
)

export const app = new ServerFactory('Api2', config, routing)
