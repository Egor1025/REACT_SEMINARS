import type { User } from '../services/usersApi'

type UsersListProps = {
    users: User[]
    onEdit: (user: User) => void
}

export function UsersList({ users, onEdit }: UsersListProps) {
    return (
        <ul className="user-list">
            {users.map(user => (
                <li key={user.id} className="user-item">
                    <div className="user-main">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                    </div>
                    <button type="button" onClick={() => onEdit(user)}>
                        Редактировать
                    </button>
                </li>
            ))}
        </ul>
    )
}