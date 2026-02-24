import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { User } from '../services/usersApi'
import { UsersList } from './UsersList'

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
]

describe('UsersList', () => {
  it('рендерит имена и email пользователей', () => {
    const onEdit = vi.fn()

    render(<UsersList users={users} onEdit={onEdit} />)

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
  })

  it('вызывает onEdit с корректным пользователем при клике по кнопке', () => {
    const onEdit = vi.fn()

    render(<UsersList users={users} onEdit={onEdit} />)

    const button = screen.getAllByText('Редактировать')[1]
    fireEvent.click(button)

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(users[1])
  })
})
