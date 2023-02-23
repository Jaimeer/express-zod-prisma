import { type Routing, createConfig, createServer, z, OpenAPI } from 'express-zod-api'
import openApiRouting from './routes/openapi.route'

export type ServerConfig = {
  port: number
  tags: Record<string, string>
}
export class ServerFactory {
  private openApiJson: string = ''

  constructor(
    private readonly serverName: string,
    private readonly serverConfig: ServerConfig,
    private readonly routing: Routing
  ) {}

  private generateOpenApi(config: ReturnType<typeof createConfig>, routing: Routing) {
    this.openApiJson = new OpenAPI({
      routing,
      config,
      version: '1.0.0',
      title: `${this.serverName.toUpperCase()} Openapi`,
      serverUrl: 'https://example.com',
    }).getSpecAsJson()
  }

  init() {
    const config = createConfig({
      server: {
        listen: this.serverConfig.port,
      },
      cors: true,
      logger: {
        level: 'debug',
        color: true,
      },
      startupLogo: false,
      tags: this.serverConfig.tags,
    })

    this.generateOpenApi(config, this.routing)
    const customRouting = {
      openapi: openApiRouting(this.openApiJson),
      ...this.routing,
    }

    createServer(config, customRouting)
  }
}
