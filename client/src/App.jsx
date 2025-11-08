import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <Router>
        <div>
          <Routes>
             <Route path='/' element={<Home />} />
             <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App
