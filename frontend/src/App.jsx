import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import CreateLabel from './components/CreateLabel'
import InventoryList from './components/InventoryList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<CreateLabel />} /> */}
          <Route path="/labels" element={<InventoryList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
