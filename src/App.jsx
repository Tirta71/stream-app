import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  continueWatching,
  heroMovie,
  newReleases,
  topRatedMovies,
  trendingMovies,
} from './data/movies.js'
import ManageMovies from './pages/admin/ManageMovies.jsx'
import Home from './pages/public/Home.jsx'
import Login from './pages/public/Login.jsx'
import Register from './pages/public/Register.jsx'

function App() {
  const [movieGroups, setMovieGroups] = useState({
    continueWatching,
    topRatedMovies,
    trendingMovies,
    newReleases,
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home heroMovie={heroMovie} movieGroups={movieGroups} />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/movies"
          element={<ManageMovies movieGroups={movieGroups} setMovieGroups={setMovieGroups} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
