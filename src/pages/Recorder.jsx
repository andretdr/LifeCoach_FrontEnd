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
        console.log(stream);
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
                startRecording();
        }}
    
        const handleKeyUp = (e) =>{
            if (isRecording.current && e.key === ' '){
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
            <h2>Audio Recorder</h2>
            <main>

                <div className="audio-controls">
                    {!permission ? (
                        <button className='btn btn-primary' onClick={getMicrophonePermission} type="button">
                            Ready?
                        </button>
                    ) : <div>
                        <AudioButton startRecording={startRecording} stopRecording={stopRecording}/>
                            Hold to Speak / Hold space to speak
                        </div>                    }
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
