import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id?: number
  name: string
  email: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map((user) => ({
                type: 'Users' as const,
                id: user.id
              })),
              { type: 'Users' as const, id: 'LIST' }
            ]
          : [{ type: 'Users' as const, id: 'LIST' }]
    }),
    addUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Users', id: arg.id },
        { type: 'Users', id: 'LIST' }
      ]
    })
  })
})

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } =
  usersApi
