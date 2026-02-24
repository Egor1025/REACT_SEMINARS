import { describe, it, expect, vi } from 'vitest'
import type { User } from './usersApi'
import { loadUsersWithAxios } from './usersService'
import { axiosClient } from './axiosClient'

vi.mock('./axiosClient', () => ({
    axiosClient: {
        get: vi.fn()
    }
}))

const mockedAxiosClient = axiosClient as unknown as {
    get: ReturnType<typeof vi.fn>
}

describe('loadUsersWithAxios', () => {
    it('возвращает список пользователей из axiosClient', async () => {
        const users: User[] = [
            { id: 1, name: 'Test User', email: 'test@example.com' }
        ]

        mockedAxiosClient.get.mockResolvedValue({ data: users })

        const result = await loadUsersWithAxios()

        expect(result).toEqual(users)
        expect(mockedAxiosClient.get).toHaveBeenCalledWith('/users')
    })
})