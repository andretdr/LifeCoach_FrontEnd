import { useRef, useContext, useEffect } from 'react'
import Store from '../context/context'

const Response = () =>{

    const {history, setHistory, globalResponse} = useContext(Store);
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
            data.set('history', JSON.stringify(history))
            // POST to API /talk route
            const response = await fetch('http://localhost:8000/talk', {
                mode: 'cors',
                method: 'post',
                body: data,
            });
            if (!response.ok) {
                throw error('Error on OpenAi fetch');
            }

            const resChat = await response.json();
            setHistory(resChat);

            console.log(resChat);


//            const dataObj = datas.json();
//            console.log(resObj);
            // console.log(resObj[1]);


            
//             const resData = await response;//json();
//             const blob = resData[0];
//             // // Create a temporary URL for the Blob
//              console.log(blob);
//              audioRef.current.src = blob;
//                audioRef.current.src = URL.createObjectURL(blob);
//             const history = resData[1];
//             console.log(history);



            // FOR NONSTREAMING, UNCOMMENT ME
            // const blob = await response.blob();
            // audioRef.current.src = URL.createObjectURL(blob);



            // // FOR STREAMING, UNCOMMENT ME

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
        <audio ref={audioRef} controls autoPlay />
        )
}


export default Response