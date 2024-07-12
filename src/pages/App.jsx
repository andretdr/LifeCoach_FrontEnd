import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../assets/css/App.css'
import Recorder from './Recorder'
import Store from '../context/context'

import mysound from '../assets/testAudio/test-audio2.mp3'

function App() {
  const [message, setMessage] = useState('')
  const [globalAudio, setGlobalAudio] = useState(null)

  // POST to API /talk route
  const sendResonseAPI = async(blob) => {
    console.log('API blob')
    console.log(blob)

    let data = new FormData()


    // TESTING THIS PART USING MYSOUND INSTEAD OF GLOBAL AUDIPO
//    let myaudio = new Audio(mysound);



    data.append('file', blob)

//    console.log(data);

    const response = await fetch('http://localhost:8000/talk', {
      mode: 'cors',
      method: 'post',
      body: data,
    });

    console.log('got here');

  }



  return (
    <Store.Provider value={{globalAudio, setGlobalAudio}}>
      <div className='display-1'>

        <Recorder sendResonseAPI={sendResonseAPI}/>
      </div>
    </Store.Provider >  
    )
}

export default App
