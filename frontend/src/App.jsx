import { useCallback, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import InventoryListAG from './components/InventoryListWithAG'
import IndividualItems from './components/IndividualItems'
import FilteredItems from './components/FilteredItems'
import AdminPage from './components/AdminPage'
import LoginPage from './components/LoginPage'

const readSession = () => ({
  token: sessionStorage.getItem('inventory-token'),
  username: sessionStorage.getItem('inventory-username'),
  isAdmin: sessionStorage.getItem('inventory-is-admin') === 'true',
})

function App() {
  const [session, setSession] = useState(readSession)

  const handleLogin = useCallback((token, username, isAdmin) => {
    sessionStorage.setItem('inventory-token', token)
    sessionStorage.setItem('inventory-username', username)
    sessionStorage.setItem('inventory-is-admin', String(isAdmin))
    setSession({ token, username, isAdmin })
  }, [])

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('inventory-token')
    sessionStorage.removeItem('inventory-username')
    sessionStorage.removeItem('inventory-is-admin')
    setSession({ token: null, username: null, isAdmin: false })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            session.token
              ? <Navigate to="/labels" replace />
              : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          element={session.token ? <Outlet /> : <Navigate to="/login" replace />}
        >
          <Route path="/" element={<Navigate to="/labels" replace />} />
          <Route path="/labels" element={<InventoryListAG token={session.token} username={session.username} isAdmin={session.isAdmin} onLogout={handleLogout} />} />
          <Route path="/labels/size" element={<IndividualItems token={session.token} username={session.username} isAdmin={session.isAdmin} onLogout={handleLogout} />} />
          <Route path="/labels/size/code/:labelCode" element={<FilteredItems token={session.token} username={session.username} isAdmin={session.isAdmin} onLogout={handleLogout} />} />
          <Route path="/admin" element={session.isAdmin ? <AdminPage token={session.token} username={session.username} onLogout={handleLogout} /> : <Navigate to="/labels" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
