import { StrictMode, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import CreateLabel from './components/CreateLabel'
// import InventoryList from './components/InventoryList';

import InventoryListAG from './components/InventoryListWithAG';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';

const modules = [AllCommunityModule]

function App() {
  return (
    <>
    {/* <InventoryListAG /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<CreateLabel />} /> */}
          <Route path="/labels" element={<InventoryListAG />} />
          <Route path="/labels/create" element={<CreateLabel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
