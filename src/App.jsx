import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ClassGrade from "./pages/app/classgrade/Class"
import NewClass from "./pages/app/classgrade/NewClass"
import Dashboard from "./pages/app/Dashboard"
import Layout from "./pages/app/Layout"
import Rooms from "./pages/app/rooms/Rooms"
import NewSchedule from "./pages/app/schedule/NewSchedule"
import Schedule from "./pages/app/schedule/Schedule"
import NewUser from "./pages/app/user/NewUser"
import User from "./pages/app/user/User"
import Login from "./pages/Login"
import NewRooms from "./pages/app/rooms/NewRooms"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <HelmetProvider>
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="app" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="home" element={<Dashboard/>}/>
          <Route path="user" element={<User/>}/>
          <Route path="user/new" element={<NewUser/>}/>
          <Route path="class" element={<ClassGrade/>}/>
          <Route path="class/new" element={<NewClass/>}/>
          <Route path="schedule" element={<Schedule/>}/>
          <Route path="schedule/new" element={<NewSchedule/>}/>
          <Route path="room" element={<Rooms/>}/>
          <Route path="room/new" element={<NewRooms/>}/>
          <Route/>
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
