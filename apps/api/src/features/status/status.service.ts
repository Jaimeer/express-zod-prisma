export type Status = {
  status: string
}

class StatusServiceClass {
  async get(): Promise<Status> {
    return { status: `ok` }
  }
}
export const StatusService = new StatusServiceClass()
