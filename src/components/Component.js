import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import "./Component.css";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import StopCircleTwoToneIcon from "@mui/icons-material/StopCircleTwoTone";
import SmartDisplayTwoToneIcon from "@mui/icons-material/SmartDisplayTwoTone";
export default function Component() {
  const videoRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [stop, setstop] = useState(false);
  const [Record, setRecord] = useState(true);
  const [Preview, setPreview] = useState(false);
  const [Disappear, setDisappear] = useState(true);

  const func = () => {
    setRecord(!Record);
    setTimeout(() => {
      startRecording();
    }, 1);
  };

  const Stop = () => {
    setstop(!stop);
    setTimeout(() => {
      stopRecording();
    }, 1);
    setDisappear(!Disappear);
  };

  const preview = () => {
    setTimeout(() => {
      setPreview(!Preview);
    }, 1);
  };

  const getUserMedia = () => {
    const constraints = {
      audio: false,
      video: true
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ video: true });

  getUserMedia();
  return (
    <div className="camera">
      {stop ? (
        Preview ? (
          <>
            <video
              src={mediaBlobUrl}
              controls
              autoPlay
              loop
              className="VideoScreen"
            />
            <div className="btn">
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                <VideocamTwoToneIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        ) : (
          <div className="camera">
            <video ref={videoRef} autoPlay={true} className="VideoScreen" />
            <div className="btn">
              <button onClick={preview}>
                <SmartDisplayTwoToneIcon style={{ color: "white" }} />
              </button>
            </div>
          </div>
        )
      ) : (
        <video ref={videoRef} autoPlay={true} className="VideoScreen" />
      )}

      {Record
        ? Disappear && (
            <div className="btn">
              <button onClick={func}>
                <VideocamTwoToneIcon style={{ color: "white" }} />
              </button>
            </div>
          )
        : Disappear && (
            <div className="btn">
              <button onClick={Stop}>
                <StopCircleTwoToneIcon style={{ color: "white" }} />
              </button>
            </div>
          )}
    </div>
  );
}
