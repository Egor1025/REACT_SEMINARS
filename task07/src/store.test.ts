import { describe, it, expect } from 'vitest'
import { store } from './store'
import { usersApi } from './services/usersApi'
import type { RootState } from './store'

describe('store', () => {
  it('содержит slice usersApi', () => {
    const state = store.getState() as RootState
    expect(state[usersApi.reducerPath]).toBeDefined()
  })
})
