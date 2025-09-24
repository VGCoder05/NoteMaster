import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPg from '../pages/DashboardPg'
import NoteDisplayPg from '../pages/NoteDisplayPg'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPg />} />
      <Route path="/notes" element={<NoteDisplayPg />} />
      {/* <Route path="/" element={}/> */}
    </Routes>
  );
}

export default MainRoutes