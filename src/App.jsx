import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Class from "./pages/app/classes/Class"
import Dashboard from "./pages/app/Dashboard"
import Layout from "./pages/app/Layout"
import Rooms from "./pages/app/rooms/Rooms"
import Schedule from "./pages/app/schedule/Schedule"
import User from "./pages/app/user/User"
import Login from "./pages/Login"

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="app" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="home" element={<Dashboard/>}/>
          <Route path="user" element={<User/>}/>
          <Route path="class" element={<Class/>}/>
          <Route path="schedule" element={<Schedule/>}/>
          <Route path="room" element={<Rooms/>}/>
          <Route/>
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
