import { useState, useRef, useContext, useEffect } from 'react';
import Store from '../context/context'
import '../assets/css/recorder.css'
import AudioButton from './AudioButton'

// https://blog.logrocket.com/how-to-create-video-audio-recorder-react/
// https://medium.com/@kishanhimself/recording-mp3-audio-using-reactjs-f6565979b6a3

// for styling as well
// https://www.youtube.com/watch?v=3OnMBtOyGkY


const mimeType = "audio/mpeg";

const Recorder = (props) => {
    const { setGlobalResponse } = useContext(Store)

    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const isRecording = useRef(false);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);


    /** start recording */
    const startRecording = async () => {
        setRecordingStatus("recording");
        isRecording.current = true;
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };


    /** stop recording */
    const stopRecording = () => {
        setRecordingStatus("inactive");
        isRecording.current = false;
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);

            // disable audio button
            document.getElementById('audioButton').disabled = true;
            const collection = document.getElementsByClassName('click-text');
            for (let items of collection)
                items.classList.add('click-text__disabled')

            setGlobalResponse(audioBlob);
        };
    };

    /** getting microphone permissions */
    const getMicrophonePermission = async () => {
        
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);

                props.setSession(true);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };


    /** Listen for keydown and keyUp */
    useEffect(()=>{

        const handleKeyDown = (e) =>{
            if (!isRecording.current && e.key === ' '){
                const buttonElement = document.getElementById('svg');
                buttonElement.classList.remove('svg-hover')
                buttonElement.classList.add('svg-active')
                startRecording();
        }}
    
        const handleKeyUp = (e) =>{
            if (isRecording.current && e.key === ' '){
                const buttonElement = document.getElementById('svg');
                buttonElement.classList.remove('svg-active')
                buttonElement.classList.add('svg-hover')
                stopRecording();
        }}

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp)

        return ()=> {   document.removeEventListener('keydown', handleKeyDown)
                        document.removeEventListener('keyup', handleKeyUp)
                    }
    },[stream, recordingStatus])



    return (
        <div>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <div id='startbutton-container' className='startbutton-container row justify-content-center'>
                            <div className='col-6 card bg-primary border-0 col-10 col-sm-8 col-md-6' onClick={getMicrophonePermission} type="button">
                                <span className='fs-1 fw-light text-light text-center my-auto'>Start Session</span>
                            </div>
                        </div>
                    ) : <div className='d-flex flex-column justify-content-center align-items-center'>
                        <AudioButton startRecording={startRecording} stopRecording={stopRecording}/>
                        <span id='click-text' className='d-block d-sm-none text-center p-4 click-text'>Tap and hold to speak</span>
                        <span id='click-text' className='d-none d-sm-block p-4 click-text'>Click and hold / Hold space to speak</span>
                        </div>}
                    {audio ? (
                        <div className="audio-container">
                            <audio src={audio}></audio>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default Recorder;
