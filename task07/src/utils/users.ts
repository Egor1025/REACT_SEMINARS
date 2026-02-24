import type { User } from '../services/usersApi'

export const filterUsersByEmailDomain = (users: User[], domain: string) =>
  users.filter((user) => user.email.endsWith(`@${domain}`))

export const sortUsersByName = (users: User[]) =>
  [...users].sort((a, b) => a.name.localeCompare(b.name))
