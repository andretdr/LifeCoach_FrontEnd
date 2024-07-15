import { useEffect, useState, useRef, Suspense } from 'react'
import '../assets/css/App.css'
import Recorder from './Recorder'
import Response from './Response'

function App() {
  const audioRef = useRef(null);

  const [message, setMessage] = useState('')
  const [globalAudio, setGlobalAudio] = useState(null)


  const sendResonseAPI = async(blob) => {

    // function to load stream
     const sourceOpen = async () => {
       const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

       const reader = response.body.getReader();

       const start = () => {
        // The following function handles each data chunk
        // push is recursive, until all is read
        const push = () => {
          // "done" is a Boolean and value a "Uint8Array"
          reader.read().then(({ done, value }) => {
            // If there is no more data to read
            if (done) {
              console.log("done", done);
              //mediaSource.endOfStream();
              return;
            }
            // Get the data and send it to the browser via the controller
            sourceBuffer.appendBuffer(value);
            // Check chunks by logging to the console
            console.log(done, value);
            push();
          });
        }
        // recursive push
        push();
      }
      // starts this recursive call
      start();
    }



// // UNSURE

//       const pump = async () => {
//         try {
//           while (true) {
//             const { done, value } = await reader.read();
//             if (done) {
//               break;
//             }
//             await appendBuffer(sourceBuffer, value);
//           }
//         } catch (error) {
//           console.error('Error reading stream:', error);
//         } finally {
//           mediaSource.endOfStream();
//         }
//       };

//       const appendBuffer = (sourceBuffer, chunk) => {
//         return new Promise((resolve, reject) => {
//           if (sourceBuffer.updating) {
//             sourceBuffer.addEventListener('updateend', function onEnd() {
//               sourceBuffer.removeEventListener('updateend', onEnd);
//               sourceBuffer.appendBuffer(chunk);
//               resolve();
//             });
//           } else {
//             sourceBuffer.appendBuffer(chunk);
//             resolve();
//           }
//         });
//       };

//       pump();
//     }
    

    let data = new FormData()
    data.append('file', blob)
    // POST to API /talk route
    const response = await fetch('http://localhost:8000/talk', {
      mode: 'cors',
      method: 'post',
      body: data,
    });

    const mediaSource = new MediaSource();
    // audioRef.current is the audio DOM element, .src is the audio element's src attr
    // this is the way to do something like document.querySelector('audio')
    audioRef.current.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', sourceOpen);

    

  };



  return (
      <div className='display-1'>
        <Recorder sendResonseAPI={sendResonseAPI}/>
        <audio ref={audioRef} autoPlay />
      </div>
    )
}

export default App
