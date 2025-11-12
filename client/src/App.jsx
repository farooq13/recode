import ThemeProvider from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';


function App() {
  return (
    <ThemeProvider>
        <div className='app min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300'>
          {/* Header */}
          <Header />
        </div>
    </ThemeProvider>
  )
}

export default App
