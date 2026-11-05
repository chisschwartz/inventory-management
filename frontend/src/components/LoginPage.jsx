import { useState } from 'react'

const encodeCredentials = (value) => {
  const bytes = new TextEncoder().encode(value)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodeCredentials(`${username}:${password}`)}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError('That username and password do not match.')
          return
        }
        throw new Error(`Unable to sign in (status ${response.status}).`)
      }

      const { token } = await response.json()
      if (!token) {
        throw new Error('The server did not return a sign-in token.')
      }

      onLogin(token, username)
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <a className="brand" href="/" aria-label="Stockroom home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Stockroom</span>
        </a>
        <div className="login-intro">
          <p className="eyebrow">INVENTORY MANAGEMENT</p>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to view your inventory.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            autoComplete="username"
            autoFocus
            id="username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            required
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button login-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-footnote">Authorized users only</p>
      </section>
    </main>
  )
}

export default LoginPage
