import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Header } from './components/Header.tsx'
import { Home } from './pages/Home.tsx'

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}