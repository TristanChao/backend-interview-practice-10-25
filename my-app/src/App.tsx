import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Header } from './components/Header.tsx'
import { Home } from './pages/Home.tsx'
import { ReviewForm } from './pages/ReviewForm.tsx'
import { NotFound } from './pages/NotFound.tsx'

export default function App() {

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='/review/:movieId' element={<ReviewForm />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}