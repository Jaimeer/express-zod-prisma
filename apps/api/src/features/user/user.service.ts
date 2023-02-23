import { PaginateResponse } from '../../dto/response.dto'
import { Status } from '../status/status.service'

export type User = {
  id: string
  name: string
}

class UserServiceClass {
  async list(user: User): Promise<PaginateResponse<User>> {
    return { items: [user], totalItems: 1 }
  }
  async get(user: User): Promise<User> {
    return user
  }
  async create(data: Omit<User, 'id'>): Promise<User> {
    return { ...data, id: 'new' }
  }
  async update(user: User, data: Partial<Omit<User, 'id'>>): Promise<User> {
    return { ...user, ...data, id: 'update' }
  }
  async remove(_: User): Promise<Status> {
    return { status: 'deleted' }
  }
}
export const UserService = new UserServiceClass()
