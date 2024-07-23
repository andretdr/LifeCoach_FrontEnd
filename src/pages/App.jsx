// detecting autoplay failure

import { useState, } from 'react'
import '../assets/css/App.css'
import Recorder from './Recorder'
import Response from './Response'
import Store from '../context/context'
import Navbar from './Navbar'
import Footer from './Footer'
import indexWriteUp from '../assets/data/writeUp'
import career from '../assets/imgs/career.jpg'


function App() {
  const [globalResponse, setGlobalResponse] = useState(null)
  const [history, setHistory] = useState([])
  const [startSession, setSession] = useState(false)
//  const [state, setState] = useState('')

  return (
    <Store.Provider value={{globalResponse, setGlobalResponse, history, setHistory}}>
      <Navbar />
      <body className='bg-light py-5 px-3 d-flex'>

        <div id='mainCard' className='container-md card bg-secondary py-5'>
          {/* <img className='card-img-top img-fluid' src={career} width='150%'></img> */}
          <div className='card-body d-flex flex-column justify-content-center'>
            <div className='row'>
              {startSession === false
                ? <div className='write-ups'>
                    <h1 className='col-12 col-md-9 display-1 px-0 py-0 text-white text-start mx-auto'>{indexWriteUp[0]}</h1>
                    <p className='col-12 col-md-9 text-light px-0 text-start mx-auto'>{indexWriteUp[1]}</p>
                    <p className='col-12 col-md-9 text-light px-0 text-start mx-auto'>{indexWriteUp[2]}</p>
                  </div>
                : null
              }
            </div>
            <Response />
            <Recorder setSession={setSession}/>
          </div>
        </div>

      </body>
      <Footer />
    </Store.Provider>
    )
}

export default App
