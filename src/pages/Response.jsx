// https://www.youtube.com/watch?v=FK0867WUbvE

import { useState, useRef, useContext, useEffect } from 'react'
import Store from '../context/context'

const Thinking = (props) => {
    return (<div className='thinking-container text-center text-light display-6'>
            {props.thinking
            ?   <p>
                    Thinking...
                </p>
            : <></>
            }
            </div>
    )
}


const Response = () =>{

    const {history, setHistory, globalResponse} = useContext(Store);
    const audioRef = useRef(null);
    const [thinking, setThinking] = useState(false)

    const [url, setUrl] = useState('')
    
    useEffect(()=>{

        const handleDisableRecord = (blobUrl) =>{
            const audioElement = document.getElementById('talk');
            audioElement.addEventListener('ended', () => {
                // disable audio button
                document.getElementById('audioButton').disabled = false;
                // discolor click n hold text
                const collection = document.getElementsByClassName('click-text');
                for (let items of collection)
                    items.classList.remove('click-text__disabled')
                URL.revokeObjectURL(blobUrl);

            }, {once: true}); // runs once, then removes self
        };

        const openAiCall = async() =>{
            setThinking(true);
            
            const data = new FormData()
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
            elevenLabCall(resChat);

        }

        const elevenLabCall = async(chat_history) =>{
            const data = new FormData()
            data.set('history', JSON.stringify(chat_history))
            // POST to API /talk route
            const response = await fetch('http://localhost:8000/reply', {
                mode: 'cors',
                method: 'post',
                body: data,
            });
            if (!response.ok) {
                throw error('Error on ElevenLab fetch');
            }

            const blob = await response.blob();
            const localurl = URL.createObjectURL(blob);
            setUrl(localurl);
            audioRef.current.src = localurl;

            handleDisableRecord(localurl);


            setThinking(false);

        }
       
        globalResponse !== null
        ? openAiCall()
        : null

    }, [globalResponse]);

return (<>
        <audio id='talk' ref={audioRef} autoPlay />
        {/* <a download href={url}>download</a> */}
        <Thinking thinking={thinking}/>
        </>
        )
}


export default Response