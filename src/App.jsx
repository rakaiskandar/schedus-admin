import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import EditUser from "./pages/app/user/EditUser"
import EditSchedule from "./pages/app/schedule/EditSchedule"
import Lesson from "./pages/app/lessons/Lesson"
import NewLesson from "./pages/app/lessons/NewLesson"
import EditLesson from "./pages/app/lessons/EditLesson"
import EditRooms from "./pages/app/rooms/EditRooms"
import Event from "./pages/app/events/Event"
import NewEvent from "./pages/app/events/NewEvent"
import EditEvent from "./pages/app/events/EditEvent"

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
              <Route path="lesson" element={<Lesson/>}/>
              <Route path="lesson/new" element={<NewLesson/>}/>
              <Route path="lesson/:id" element={<EditLesson/>}/>
              <Route path="schedule" element={<Schedule />} />
              <Route path="schedule/new" element={<NewSchedule />} />
              <Route path="schedule/:id" element={<EditSchedule/>}/>
              <Route path="room" element={<Rooms />} />
              <Route path="room/new" element={<NewRooms />} />
              <Route path="room/:id" element={<EditRooms/>}/>
              <Route path="event" element={<Event/>}/>
              <Route path="event/new" element={<NewEvent/>}/>
              <Route path="event/:id" element={<EditEvent/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </HelmetProvider>
  )
}

export default App
