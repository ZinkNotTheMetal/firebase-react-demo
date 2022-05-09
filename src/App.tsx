import { useState } from 'react'
import './App.css'
import Add from './pages/Add'
import { setupFirebase } from './services/firebase.service'

function App() {
  const [count, setCount] = useState(0)

  setupFirebase();

  return (
    <div className="App">
      <header className="App-header">
      <Add />
      </header>
      
    </div>
  )
}

export default App
