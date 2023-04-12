import { observer } from 'mobx-react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import CreateMadePage from './pages/CreateMadePage'
import CreateMakePage from './pages/CreateMakePage'
import MadeView from './pages/MadeView'
import MakeView from './pages/MakeView'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
        <Route path='made' element={<MadeView/>}/>
        <Route path='make' element={<MakeView/>}/>
        <Route path='create-make' element={<CreateMakePage/>}/>
        <Route path='create-made' element={<CreateMadePage/>}/>


        <Route path='*' element={<NotFound/>}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default observer(App)
