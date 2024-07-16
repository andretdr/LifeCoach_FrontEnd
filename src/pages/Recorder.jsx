import { useState, useRef, useContext } from 'react';
import Store from '../context/context'
import '../assets/css/recorder.css'

// https://blog.logrocket.com/how-to-create-video-audio-recorder-react/
// https://medium.com/@kishanhimself/recording-mp3-audio-using-reactjs-f6565979b6a3

const mimeType = "audio/mpeg";

const Recorder = (props) => {
    const { setGlobalResponse } = useContext(Store)

    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    /** start recording */
    const startRecording = async () => {
        setRecordingStatus("recording");
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
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);

            // record global audio state
//            console.log('audioBlob');
//            console.log(audioBlob);

            setGlobalResponse(audioBlob);
//            props.sendResonseAPI(audioBlob);
            console.log('Got new one!');
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


    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>

                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}

                    {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls></audio>
                            <a download href={audio}>
                                Download Recording
                            </a>
                        </div>
                    ) : null}

                </div>
            </main>
        </div>
    );
};

export default Recorder;
