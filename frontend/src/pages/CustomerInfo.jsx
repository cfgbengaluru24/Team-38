import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import Graphs from "../components/Graphs";
import "tailwindcss/tailwind.css";
import FormComponent from "../components/FormComponent";
import Predict from "./Predict";

const CustomerInfo = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [modules, setModules] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mp3URL, setMp3URL] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/t/customers?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    const fetchModules = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/t/module?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchInsights = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/t/insights?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setInsights(data.insights || []);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchCustomer();
    fetchModules();
    fetchInsights();
  }, [id]);

  const handleRecord = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);

          const mp3Url = await convertToMp3(audioBlob);
          setMp3URL(mp3Url);

          uploadMp3(audioBlob);

          // Update states to show the form and success message
          setShowForm(true);
          setSuccessMessage("Successfully translated to Kannada");
        };

        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setShowForm(true);
      setSuccessMessage("Successfully translated to Kannada");
      setShowInsights(true);
    }
  };

  const convertToMp3 = async (audioBlob) => {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const mp3Blob = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const webmToMp3 = window.WebmToMp3;
          webmToMp3.convert(
            reader.result,
            (mp3Data) => {
              resolve(new Blob([mp3Data], { type: "audio/mp3" }));
            },
            reject
          );
        };
        reader.readAsArrayBuffer(new Blob([arrayBuffer]));
      });
      return URL.createObjectURL(mp3Blob);
    } catch (error) {
      console.error("Error converting to MP3:", error);
      return "";
    }
  };

  const uploadMp3 = async (mp3Blob) => {
    const formData = new FormData();
    formData.append("file", mp3Blob, "recording.mp3");

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setUploadStatus("Upload successful");
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      setUploadStatus("Upload error");
      console.error("Upload error:", error);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex justify-center items-center gap-4">
        <div className="text-2xl font-bold mb-4">
          Start recording to automatically fill the survey form and generate
          insights!
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          {audioURL && <audio controls src={audioURL} className="mt-4"></audio>}
          {mp3URL && (
            <a
              href={mp3URL}
              download="recording.mp3"
              className="mt-4 block text-blue-500 underline"
            >
              Download MP3
            </a>
          )}
        </div>

        {!showForm && (
          <button
            className={`bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 ${
              isRecording ? "bg-red-500" : ""
            }`}
            onClick={handleRecord}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        )}
      </div>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
      {successMessage && (
        <p className="mt-4 font-semibold text-green-600 text-center mb-8">{successMessage}</p>
      )}
      {showForm && <FormComponent />}

      

      {showInsights && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Insights</h2>
          {insights.map((insight, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                {insight.name}
              </label>
              <p className="text-lg text-gray-900">{insight.value}</p>
            </div>
          ))}
          <Graphs />
        </div>
      )}

      <div className="my-1">
        <Predict/>
      </div>
    </div>
  );
};

export default CustomerInfo;
