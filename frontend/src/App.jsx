import { StrictMode, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import CreateLabel from './components/CreateLabel'
// import InventoryList from './components/InventoryList';

import InventoryListAG from './components/InventoryListWithAG';
import IndividualItems from './components/IndividualItems';
import FilteredItems from './components/FilteredItems';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';

const modules = [AllCommunityModule]

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/labels" element={<InventoryListAG />} />
          <Route path="/labels/create" element={<CreateLabel />} />
          <Route path="/labels/size" element={<IndividualItems />} />
          <Route path="/labels/size/code/:labelCode" element={<FilteredItems />} />
          <Route path="/users/user/userProfile"/>
          <Route path="/login"/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
