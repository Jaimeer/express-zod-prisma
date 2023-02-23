import { PaginateResponse } from '../../dto/response.dto'

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
}
export const UserService = new UserServiceClass()
