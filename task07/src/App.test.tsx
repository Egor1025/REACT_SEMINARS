import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { axiosClient } from './services/axiosClient'

vi.mock('./services/usersApi', () => {
  return {
    useGetUsersQuery: () => ({
      data: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ],
      isLoading: false,
      isError: false
    }),
    useAddUserMutation: () => [vi.fn(), { isLoading: false }],
    useUpdateUserMutation: () => [vi.fn(), { isLoading: false }]
  }
})

vi.mock('./services/axiosClient', () => {
  return {
    axiosClient: {
      get: vi.fn()
    }
  }
})

const mockedAxiosClient = axiosClient as unknown as {
  get: ReturnType<typeof vi.fn>
}

describe('App', () => {
  it('отображает пользователей из RTK Query и загружает список через Axios', async () => {
    mockedAxiosClient.get.mockResolvedValue({
      data: [{ id: 3, name: 'Charlie', email: 'charlie@example.com' }]
    })

    render(<App />)

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()

    const axiosButton = screen.getByText('Загрузить через Axios')
    fireEvent.click(axiosButton)

    expect(mockedAxiosClient.get).toHaveBeenCalledTimes(1)
    expect(mockedAxiosClient.get.mock.calls[0][0]).toBe('/users')

    expect(await screen.findByText('Charlie')).toBeInTheDocument()
    expect(await screen.findByText('charlie@example.com')).toBeInTheDocument()
  })
})
