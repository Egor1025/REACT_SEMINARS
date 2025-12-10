import { type FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {
    useAddUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    type User
} from './services/usersApi'
import { axiosClient } from './services/axiosClient'

function App() {
    const { data: users, isLoading, isError } = useGetUsersQuery()
    const [addUser, { isLoading: isAdding }] = useAddUserMutation()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [editUser, setEditUser] = useState<User | null>(null)
    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')

    const [axiosUsers, setAxiosUsers] = useState<User[]>([])
    const [axiosLoading, setAxiosLoading] = useState(false)
    const [axiosError, setAxiosError] = useState<string | null>(null)
    const [axiosController, setAxiosController] = useState<AbortController | null>(null)

    useEffect(() => {
        if (editUser) {
            setEditName(editUser.name)
            setEditEmail(editUser.email)
        } else {
            setEditName('')
            setEditEmail('')
        }
    }, [editUser])

    const handleAddUser = async (event: FormEvent) => {
        event.preventDefault()
        if (!newName.trim() || !newEmail.trim()) return
        await addUser({ name: newName.trim(), email: newEmail.trim() }).unwrap()
        setNewName('')
        setNewEmail('')
    }

    const handleSelectEditUser = (user: User) => {
        setEditUser(user)
    }

    const handleUpdateUser = async (event: FormEvent) => {
        event.preventDefault()
        if (!editUser || !editUser.id) return
        if (!editName.trim() || !editEmail.trim()) return
        await updateUser({
            id: editUser.id,
            name: editName.trim(),
            email: editEmail.trim()
        }).unwrap()
        setEditUser(null)
    }

    const handleAxiosLoad = async () => {
        if (axiosLoading) return
        const controller = new AbortController()
        setAxiosController(controller)
        setAxiosError(null)
        setAxiosLoading(true)
        try {
            const response = await axiosClient.get<User[]>('/users', {
                signal: controller.signal
            })
            setAxiosUsers(response.data)
        } catch (error) {
            if (axios.isCancel(error)) {
                setAxiosError('Запрос отменен')
            } else if (error instanceof Error) {
                setAxiosError(error.message)
            } else {
                setAxiosError('Ошибка запроса')
            }
        } finally {
            setAxiosLoading(false)
            setAxiosController(null)
        }
    }

    const handleAxiosCancel = () => {
        if (axiosController) {
            axiosController.abort()
        }
    }

    return (
        <div className="app">
            <h1>Список пользователей</h1>

            <section className="block">
                <h2>Список (RTK Query)</h2>
                {isLoading && <p>Загрузка...</p>}
                {isError && <p>Ошибка загрузки</p>}
                {users && (
                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user.id} className="user-item">
                                <div className="user-main">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-email">{user.email}</span>
                                </div>
                                <button type="button" onClick={() => handleSelectEditUser(user)}>
                                    Редактировать
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="block">
                <h2>Добавить пользователя</h2>
                <form className="form" onSubmit={handleAddUser}>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newEmail}
                        onChange={event => setNewEmail(event.target.value)}
                    />
                    <button type="submit" disabled={isAdding}>
                        Создать
                    </button>
                </form>
            </section>

            <section className="block">
                <h2>Редактировать пользователя</h2>
                {editUser ? (
                    <form className="form" onSubmit={handleUpdateUser}>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={editName}
                            onChange={event => setEditName(event.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editEmail}
                            onChange={event => setEditEmail(event.target.value)}
                        />
                        <button type="submit" disabled={isUpdating}>
                            Сохранить
                        </button>
                        <button type="button" onClick={() => setEditUser(null)}>
                            Отмена
                        </button>
                    </form>
                ) : (
                    <p>Выбери пользователя выше</p>
                )}
            </section>

            <section className="block">
                <h2>Axios + AbortController</h2>
                <div className="buttons-row">
                    <button type="button" onClick={handleAxiosLoad} disabled={axiosLoading}>
                        Загрузить через Axios
                    </button>
                    <button
                        type="button"
                        onClick={handleAxiosCancel}
                        disabled={!axiosController}
                    >
                        Отменить загрузку
                    </button>
                </div>
                {axiosLoading && <p>Загрузка через Axios...</p>}
                {axiosError && <p>{axiosError}</p>}
                {axiosUsers.length > 0 && (
                    <ul className="user-list">
                        {axiosUsers.map(user => (
                            <li key={user.id} className="user-item">
                                <div className="user-main">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-email">{user.email}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default App