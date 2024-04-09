import { useState } from 'react'
import './App.css'
import { useParams } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
const { username } = useParams()


  return (

    <div>
      hello
    </div>
  )
}

export default App
