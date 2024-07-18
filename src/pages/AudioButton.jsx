import { useEffect, useState } from 'react';
import '../assets/css/audioButton.css'
import dave_lifecoach from '../assets/testAudio/dave_lifecoach_03.mp3'



const AudioSVG = (props) => {

    const handleMouseDown = () =>{
        const buttonElement = document.getElementById('svg');
        buttonElement.classList.remove('svg-hover')
        buttonElement.classList.add('svg-active')
        props.startRecording();

    }

    const handleMouseUp = () =>{
        const buttonElement = document.getElementById('svg');
        buttonElement.classList.remove('svg-active')
        buttonElement.classList.add('svg-hover')
        props.stopRecording();
        
    }
    
    const [status, setStatus] = useState('PLAYING')
    const [currTime, setTime] = useState(0)

    useEffect(()=>{
        // const introAudio = new Audio(dave_lifecoach);
        // // disable audio button
        // document.getElementById('audioButton').disabled = true;
        // const collection = document.getElementsByClassName('click-text');
        // for (let items of collection)
        //     items.classList.add('click-text__disabled')

        // introAudio.play();

        // introAudio.ontimeupdate = ()=>{setTime(introAudio.currentTime)}

        // // add eventListener for when audio finishes
        // introAudio.addEventListener('ended', ()=>{

        //     setStatus('STOP');

        //     document.getElementById('audioButton').disabled = false
        //     const collection = document.getElementsByClassName('click-text');
        //     for (let items of collection)
        //         items.classList.remove('click-text__disabled')
        // },{once:true})

    },[])

    return (<div className='display-1 text-white'>
            STATUS = {status}
            TIME = {currTime}
            <button id='audioButton' className='audio-button mb-5 bg-transparent border-0' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <svg id='svg' className='svg svg-hover' fill="white" width="256px" height="256px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path d="M12,15a5.006,5.006,0,0,0,5-5V6A5,5,0,0,0,7,6v4A5.006,5.006,0,0,0,12,15ZM9,6a3,3,0,0,1,6,0v4a3,3,0,0,1-6,0ZM3,10V8A1,1,0,0,1,5,8v2a7,7,0,0,0,14,0V8a1,1,0,0,1,2,0v2a9.011,9.011,0,0,1-8,8.941V21h3a1,1,0,0,1,0,2H8a1,1,0,0,1,0-2h3V18.941A9.011,9.011,0,0,1,3,10Z" />
                    </g>
                </svg>
            </button>
            </div>

            )
}

export default AudioSVG