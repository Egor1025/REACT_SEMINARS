import { describe, it, expect } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from './axiosClient'

describe('axiosClient', () => {
  it('добавляет baseURL и Authorization header', async () => {
    const mock = new MockAdapter(axiosClient)

    mock.onGet('/users').reply((config) => {
      expect(config.baseURL).toBe('https://jsonplaceholder.typicode.com')
      expect(config.headers?.Authorization).toBe('Bearer demo-token')

      return [200, []]
    })

    await axiosClient.get('/users')
  })
})
