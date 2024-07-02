import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function DemoComp() {
    const [images, setImages] = useState([]);
    const [uTubeLink, setuTubeLink] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [recentlyUploaded, setRecentlyUploaded] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setInputValue(e.target.result);
            setRecentlyUploaded(e.target.result);
        };
        reader.readAsDataURL(file);
    };



    const handleUploadYoutubeLink = (e) => {
        const youtubeUrl = e.target.value;
        if (youtubeUrl.includes("youtube.com")) {
            const videoId = youtubeUrl.split("v=")[1];
            if (videoId) {
                const ampersandPosition = videoId.indexOf("&");
                const id = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
                const youtubeEmbedUrl = `https://www.youtube.com/embed/${id}`;
                setInputValue(youtubeEmbedUrl); // Update inputValue state
                setRecentlyUploaded(youtubeEmbedUrl);
            }
        }
    };


    const handleAddImage = () => {
        if (uTubeLink) {
            setImages([...images, { type: "YouTubeLink", url: inputValue }]);
        } else {
            setImages([...images, { type: "Image", url: recentlyUploaded }]);
        }
        setInputValue("");
        setRecentlyUploaded("");
    };
    console.log(recentlyUploaded, "=================================recentlyUploaded")
    console.log(inputValue, "inputValue=============================")
    console.log(images, "=========================images")
    return (
        <>
            <div className="row mt-3">
                <div className="col-md-8 m-auto mt-3">
                    <p className="d-flex m-auto sub_heading">
                        <span
                            className="cursor"
                            name="img"
                            onClick={() => setuTubeLink(false)}
                        >
                            Upload Images/
                        </span>
                        <span
                            className="me-2 cursor"
                            name="ulink"
                            onClick={() => setuTubeLink(true)}
                        >
                            Youtube Link
                        </span>
                        <div >
                            {uTubeLink ? (
                                <Form.Control placeholder="Youtube link..."
                                    className="col-md-4 p-0" onChange={handleUploadYoutubeLink} type="text" />
                            ) : (
                                <Form.Control
                                    className="col-md-4 p-0" onChange={handleImage} type="file" />
                            )}
                        </div>
                    </p>

                    <div className="session-image mt-3 p-2 text-center" >
                        {recentlyUploaded && (
                            recentlyUploaded.includes("youtube.com") ? (
                                <iframe
                                    width="560"
                                    height="315"
                                    src={recentlyUploaded}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img
                                    src={recentlyUploaded}
                                    alt="Uploaded"
                                    className="col-md-12 m-auto p-0"
                                    style={{ borderRadius: "10px" }}
                                />
                            )
                        )}
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row text-center mt-5">
                <button
                    className="col-md-2 p-1 submit m-auto shadow-sm"
                    onClick={handleAddImage}
                >
                    Upload Images
                </button>
            </div>
        </>
    );
}
