import { useRef, useContext, useEffect } from 'react'
import Store from '../context/context'

const Response = () =>{

    const {globalResponse} = useContext(Store);
    const audioRef = useRef(null);
    
    useEffect(()=>{
        const sendResonseAPI = async() => {
    
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
        

            let data = new FormData()
            data.append('file', globalResponse)
            data.set('history', JSON.stringify([{system:'asd', content:'sad'}]))
            // POST to API /talk route
            const response = await fetch('http://localhost:8000/talk', {
                mode: 'cors',
                method: 'post',
                body: data,
            });
        


            const blob = await response.blob();

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);
            audioRef.current.src = URL.createObjectURL(blob);







            // const mediaSource = new MediaSource();
            // // audioRef.current is the audio DOM element, .src is the audio element's src attr
            // // this is the way to do something like document.querySelector('audio')
            // audioRef.current.src = URL.createObjectURL(mediaSource);
        
            // mediaSource.addEventListener('sourceopen', sourceOpen);

        
        

        }

        globalResponse !== null
        ? sendResonseAPI()
        : null

    }, [globalResponse]);

return (
        <audio ref={audioRef} autoPlay />
        )
}


export default Response