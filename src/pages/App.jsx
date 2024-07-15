import { useEffect, useState, useRef, Suspense } from 'react'
import '../assets/css/App.css'
import Recorder from './Recorder'
import Response from './Response'
import Store from '../context/context'

function App() {
  const [globalResponse, setGlobalResponse] = useState(null)
  const [history, setHistory] = useState([])

  return (
    <Store.Provider value={{globalResponse, setGlobalResponse, history, setHistory}}>
      <div className='display-1'>
        <Recorder />
        <Response />
      </div>
    </Store.Provider>
    )
}

export default App
