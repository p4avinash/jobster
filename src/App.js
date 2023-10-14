import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Landing, Error, Register } from "./pages"
import {
  Profile,
  Stats,
  AllJobs,
  AddJob,
  SharedLayout,
} from "./pages/dashboard"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-jobs' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
    </BrowserRouter>
  )
}

export default App
