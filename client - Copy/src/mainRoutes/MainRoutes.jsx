import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPg from '../pages/DashboardPg'
import NoteDisplayPg from '../pages/NoteDisplayPg/NoteDisplayPgLogic'
import NoteEditor from '../pages/NoteEditorPg/NoteEditorLogic'
import TaskDisplay from '../pages/TaskDisplayPg/TaskDisplayLogic'
import TaskEditor from '../pages/TaskEditorPg/TaskEditorLogic'
import TasksPage from "../components/TaskEditor/TasksPage/TasksPageLogic";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPg />} />
      <Route path="/notes" element={<NoteDisplayPg />} />
      <Route path="/noteEditor" element={<NoteEditor/>}/>
      <Route path="/taskEditor" element={<TaskEditor/>}/> 
      <Route path="/taskDisplay" element={<TaskDisplay/>}/> 
      <Route path="/tasksPage" element={<TasksPage/>}/> 
    </Routes>
  );
}

export default MainRoutes