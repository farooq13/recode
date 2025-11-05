import Navbar from './components/Navbar';
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
    </BrowserRouter>
  )
}

export default App
