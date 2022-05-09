import { useState } from 'react'
import './App.css'
import Add from './pages/Add'
import AddWithPicture from './pages/AddWithPicture'
import ListWithKeyGen from './pages/ListWithKeyGen'
import Sightings from './pages/Sightings'
import { setupFirebase } from './services/firebase.service'

function App() {
  const [count, setCount] = useState(0)

  setupFirebase();

  return (
    <div className="App">
      <header className="App-header">

        {/* <Sightings /> */}
        <Add />

        <AddWithPicture />

        <ListWithKeyGen />

      </header>
      
    </div>
  )
}

export default App
