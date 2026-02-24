import { describe, it, expect } from 'vitest'
import type { User } from '../services/usersApi'
import { filterUsersByEmailDomain, sortUsersByName } from './users'

const users: User[] = [
  { id: 1, name: 'Charlie', email: 'charlie@example.com' },
  { id: 2, name: 'Alice', email: 'alice@test.com' },
  { id: 3, name: 'Bob', email: 'bob@example.com' }
]

describe('filterUsersByEmailDomain', () => {
  it('фильтрует пользователей по домену email', () => {
    const result = filterUsersByEmailDomain(users, 'example.com')
    expect(result.map((u) => u.name)).toEqual(['Charlie', 'Bob'])
  })
})

describe('sortUsersByName', () => {
  it('сортирует пользователей по имени по алфавиту', () => {
    const result = sortUsersByName(users)
    expect(result.map((u) => u.name)).toEqual(['Alice', 'Bob', 'Charlie'])
  })
})
