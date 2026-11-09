import { useEffect, useState } from 'react'
import InventoryHeader from './InventoryHeader'

const getResponseError = async (response, action) => {
  let detail = ''
  try {
    const body = await response.json()
    detail = body.detail || body.message || ''
  } catch {
    // The response may not include a JSON error body.
  }
  return detail || `${action} failed (status ${response.status}).`
}

function AdminPage({ token, username, onLogout }) {
  const [users, setUsers] = useState([])
  const [usernameInput, setUsernameInput] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async () => {
      setIsLoading(true)
      setLoadError('')
      try {
        const response = await fetch('/api/admin/all-users', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(await getResponseError(response, 'Could not load users'))
        }
        setUsers(await response.json())
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(error.message || 'Could not load users. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [token, reloadCount])

  const handleCreateUser = async (event) => {
    event.preventDefault()
    setActionError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/all-users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput, email, password, role }),
      })
      if (!response.ok) {
        throw new Error(await getResponseError(response, 'Could not create user'))
      }

      const createdUser = await response.json()
      setUsers((currentUsers) => [...currentUsers, createdUser].sort((a, b) => a.username.localeCompare(b.username)))
      setUsernameInput('')
      setEmail('')
      setPassword('')
      setRole('USER')
      setSuccessMessage(`${createdUser.username} was created.`)
    } catch (error) {
      setActionError(error.message || 'Could not create user. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (user) => {
    setDeletingId(user.id)
    setActionError('')
    setSuccessMessage('')

    try {
      const response = await fetch(`/api/admin/all-users/${user.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        throw new Error(await getResponseError(response, 'Could not delete user'))
      }

      setUsers((currentUsers) => currentUsers.filter((currentUser) => currentUser.id !== user.id))
      setConfirmDeleteId(null)
      setSuccessMessage(`${user.username} was deleted.`)
    } catch (error) {
      setConfirmDeleteId(null)
      setActionError(error.message || 'Could not delete user. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="inventory-app">
      <InventoryHeader username={username} isAdmin onLogout={onLogout} />
      <main className="inventory-main admin-main">
        <div className="page-heading">
          <div>
            <p className="eyebrow">ADMINISTRATION</p>
            <h1>Manage users</h1>
            <p className="page-description">Create user or admin accounts and remove accounts that are no longer needed.</p>
          </div>
          <span className="inventory-count" aria-live="polite">
            {isLoading ? 'Loading…' : `${users.length} ${users.length === 1 ? 'account' : 'accounts'}`}
          </span>
        </div>

        <section className="admin-create-panel" aria-labelledby="create-user-title">
          <div className="admin-section-heading">
            <div>
              <h2 id="create-user-title">Create an account</h2>
              <p>Admin accounts can manage users and inventory.</p>
            </div>
          </div>
          <form className="admin-user-form" onSubmit={handleCreateUser}>
            <div className="form-field">
              <label htmlFor="new-username">Username</label>
              <input autoComplete="off" id="new-username" maxLength="100" onChange={(event) => setUsernameInput(event.target.value)} required value={usernameInput} />
            </div>
            <div className="form-field">
              <label htmlFor="new-email">Email</label>
              <input autoComplete="off" id="new-email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
            </div>
            <div className="form-field">
              <label htmlFor="new-password">Temporary password</label>
              <input autoComplete="new-password" id="new-password" minLength="8" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            </div>
            <div className="form-field">
              <label htmlFor="new-role">Role</label>
              <select id="new-role" onChange={(event) => setRole(event.target.value)} value={role}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Creating…' : 'Create account'}
            </button>
          </form>
          {actionError && <p className="admin-feedback form-error" role="alert">{actionError}</p>}
          {successMessage && <p className="admin-feedback form-success" role="status">{successMessage}</p>}
        </section>

        <section className="inventory-panel admin-users-panel" aria-labelledby="user-list-title">
          <div className="admin-list-heading">
            <div>
              <h2 id="user-list-title">Current accounts</h2>
              <p>Passwords are never shown.</p>
            </div>
            <button className="secondary-button admin-refresh" onClick={() => setReloadCount((count) => count + 1)} type="button">
              Refresh
            </button>
          </div>
          {loadError ? (
            <div className="empty-state" role="alert">
              <h2>Unable to load accounts</h2>
              <p>{loadError}</p>
              <button className="secondary-button" onClick={() => setReloadCount((count) => count + 1)} type="button">Try again</button>
            </div>
          ) : isLoading ? (
            <p className="loading-state" role="status">Loading accounts…</p>
          ) : users.length === 0 ? (
            <div className="empty-state"><h2>No accounts found</h2></div>
          ) : (
            <div className="table-scroll">
              <table className="admin-users-table">
                <caption className="visually-hidden">User accounts and roles</caption>
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isCurrentUser = user.username === username
                    const isLastAdmin = user.role === 'ADMIN' && users.filter((account) => account.role === 'ADMIN').length === 1
                    return (
                      <tr key={user.id}>
                        <td className="code-cell">{user.username}{isCurrentUser && <span className="current-user-tag">You</span>}</td>
                        <td>{user.email}</td>
                        <td><span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role === 'ADMIN' ? 'Admin' : 'User'}</span></td>
                        <td>
                          {confirmDeleteId === user.id ? (
                            <div className="grid-action-group">
                              <span className="delete-prompt">Delete account?</span>
                              <button className="grid-action-button grid-action-delete" disabled={deletingId === user.id} onClick={() => handleDeleteUser(user)} type="button">
                                {deletingId === user.id ? 'Deleting…' : 'Confirm'}
                              </button>
                              <button className="grid-action-button grid-action-cancel" disabled={deletingId === user.id} onClick={() => setConfirmDeleteId(null)} type="button">Cancel</button>
                            </div>
                          ) : (
                            <button
                              className="grid-action-button grid-action-delete"
                              disabled={isCurrentUser || isLastAdmin}
                              onClick={() => { setActionError(''); setConfirmDeleteId(user.id) }}
                              title={isCurrentUser ? 'You cannot delete your own account' : isLastAdmin ? 'The last admin account cannot be deleted' : undefined}
                              type="button"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <footer className="page-footer">Admin actions are restricted to authorized administrators.</footer>
      </main>
    </div>
  )
}

export default AdminPage
