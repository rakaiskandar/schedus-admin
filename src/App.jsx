import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ClassGrade from "./pages/app/classgrade/Class"
import NewClass from "./pages/app/classgrade/NewClass"
import Dashboard from "./pages/app/Dashboard"
import Layout from "./pages/app/Layout"
import Rooms from "./pages/app/rooms/Rooms"
import NewSchedule from "./pages/app/schedule/NewSchedule"
import Schedule from "./pages/app/schedule/Schedule"
import User from "./pages/app/user/User"
import Login from "./pages/Login"
import NewRooms from "./pages/app/rooms/NewRooms"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { RecoilRoot } from "recoil"
import EditClass from "./pages/app/classgrade/EditClass"
import EditUser from "./pages/app/user/EditUser"
import EditSchedule from "./pages/app/schedule/EditSchedule"
import Lesson from "./pages/app/lessons/Lesson"
import NewLesson from "./pages/app/lessons/NewLesson"
import EditLesson from "./pages/app/lessons/EditLesson"

function App() {

  return (
    <HelmetProvider>
      <RecoilRoot>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="app" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="user" element={<User />} />
              <Route path="user/:id" element={<EditUser/>}/>
              <Route path="class" element={<ClassGrade />} />
              <Route path="class/new" element={<NewClass />} />
              <Route path="class/:id" element={<EditClass/>}/>
              <Route path="lesson" element={<Lesson/>}/>
              <Route path="lesson/new" element={<NewLesson/>}/>
              <Route path="lesson/:id" element={<EditLesson/>}/>
              <Route path="schedule" element={<Schedule />} />
              <Route path="schedule/new" element={<NewSchedule />} />
              <Route path="schedule/:id" element={<EditSchedule/>}/>
              <Route path="room" element={<Rooms />} />
              <Route path="room/new" element={<NewRooms />} />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </HelmetProvider>
  )
}

export default App
