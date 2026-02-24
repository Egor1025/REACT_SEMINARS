import type { User } from './usersApi'
import { axiosClient } from './axiosClient'

export const loadUsersWithAxios = async (): Promise<User[]> => {
    const response = await axiosClient.get<User[]>('/users')
    return response.data
}