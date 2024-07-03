import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import http from "../http.common.function";
import { useLocation } from "react-router-dom";

export default function Workshop() {
  const location = useLocation();
  let idd = location.state?.idd || null;
  const [WorkshopImage, setWorkshopImage] = useState([]);
  const [YouTubeLink, setYouTubeLink] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recentlyUploaded, setRecentlyUploaded] = useState("");
  const [ViewImage, setViewImage] = useState();

  const [EditWrokshop, setEditWrokshop] = useState();
  const [selectedSlots, setSelectedSlots] = useState({
    sessionType: "",
    slots: [
      {
        startTime: "",
        endTime: "",
        Workshodate: "",
        duration: "",
      },
    ],
  });

  let InitialData = {
    workshopTitle: "",
    category: "",
    city: "",
    subLocation: "",
    sessionAddress: "",
    gMapDirection: "",
    language: "",
    minAge: "",
    WFeePerParticipant: "",
    discount: "",
    OfferPrice: 0,
  };
  const [Live, setLive] = useState(false);
  const [Pause, setPause] = useState(false);
  const [Mode, setMode] = useState({ online: false, offline: false });

  const handleMode = (e) => {
    const { name, checked } = e.target;
    setMode((prevMode) => ({
      ...prevMode,
      [name]: checked,
    }));
  };

  useEffect(() => {
    getcategory();
    getWorkShop();
  }, []);
  let Terms = {
    title: "Terms & Condition",
    discription: [
      "Tickets once booked cannot be exchanged or refunded.",
      "An Internet handling fee per ticket may belevied. Please check the total amount before payment.",
      "We recommend that you arrive at least 30 minutes prior at the venue for a seamless entry.",
      "It is mandatory to wear masks at all times and follow social distancing norms.",
      "Please do not purchase tickets if you feel sick.",
      "Unlawful resale (or attempted unlawful resale) of a ticket would lead to seizure or cancellation of that ticket without refund or othercompensation.",
      " Rights of admission reserved.",
      "These terms and conditions are subject to change from time to time at the discretion of the organizer.",
    ],
  };
  const [Category, setCategory] = useState([]);
  const [WorkshopForm, setWorkshopForm] = useState(InitialData);
  const [discription, setDiscription] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [editorEnabled, setEditorEnabled] = useState(true);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const textContent = data.replace(/<[^>]*>/g, "");
    const count = textContent.length;

    if (count <= 7000) {
      setDiscription(data);
      setCharacterCount(count);
    } else {
      setEditorEnabled(false);
    }
  };

  //  handle form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkshopForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getWorkShop = async () => {
    try {
      if (idd) {
        let Wrokshop = await http.get(`/workshop/getbyworkshopbyid/${idd}`);
        setEditWrokshop(Wrokshop.data.data);
      }
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  const getcategory = async () => {
    try {
      let category = await http.get(`/category/getcategory`);
      setCategory(category.data.data);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  const AddProduct = async () => {
    try {
      if (
        !WorkshopForm.category ||
        !WorkshopForm.workshopTitle ||
        !WorkshopForm.WFeePerParticipant
      ) {
        alert("Please Fill");
      }

      const formdata = new FormData();
      formdata.append("workshopTitle", WorkshopForm.workshopTitle);
      formdata.append("category", WorkshopForm.category);
      formdata.append(
        "mode",
        JSON.stringify({
          online: Mode.online,
          offline: Mode.offline,
        })
      );
      formdata.append("city", WorkshopForm.city);
      formdata.append("subLocation", WorkshopForm.subLocation);
      formdata.append("sessionAddress", WorkshopForm.sessionAddress);
      formdata.append("gMapDirection", WorkshopForm.gMapDirection);
      formdata.append("WorkshopSlots", JSON.stringify(selectedSlots));
      formdata.append("language", WorkshopForm.language);
      formdata.append("minAge", WorkshopForm.minAge);
      formdata.append("discription", discription);
      formdata.append("terms", JSON.stringify(Terms));
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("YouTubeLink", JSON.stringify(YouTubeLink));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);

      if (WorkshopImage) {
        for (let i = 0; i < WorkshopImage.length; i++) {
          formdata.append("WorkshopImages", WorkshopImage[i]);
        }
      }

      let response = await http.post(`/workshop/addworkshop`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("WorkShop Added Successfully");
        window.location.assign("/workshop");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateAdd = () => {
    setSelectedSlots({
      ...selectedSlots,
      slots: [
        ...selectedSlots?.slots,
        {
          startTime: "",
          endTime: "",
          Workshodate: "",
          duration: "",
        },
      ],
    });
  };
  const handleRemovetrow = (index) => {
    const updatedSlots = selectedSlots.slots.filter((_, i) => i !== index);
    setSelectedSlots({ ...selectedSlots, slots: updatedSlots });
  };

  const handleChangedate = (e, index) => {
    const { name, value } = e.target;

    if (name === "sessionType") {
      setSelectedSlots({
        ...selectedSlots,
        [name]: value,
      });
    } else {
      const updatedSlots = [...selectedSlots.slots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [name]: value,
      };

      const { startTime, endTime, Workshodate } = updatedSlots[index];
      const convertToAMPMFormat = (time12h) => {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");
        let newHours = hours;
        let newModifier = modifier;
        if (hours === "00") {
          newHours = "12";
        }
        if (parseInt(hours) > 12) {
          newHours -= 12;
          newModifier = "PM";
        } else if (parseInt(hours) < 12) {
          newModifier = "AM";
        }
        return `${newHours}:${minutes} ${newModifier}`;
      };
      if (Workshodate && startTime && endTime) {
        const startAMPM = convertToAMPMFormat(startTime);
        const endAMPM = convertToAMPMFormat(endTime);

        const startDateTime = `${Workshodate} ${startAMPM}`;
        const endDateTime = `${Workshodate} ${endAMPM}`;

        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        if (!isNaN(start) && !isNaN(end)) {
          const duration = Math.abs(end - start) / 60000;
          updatedSlots[index].duration = duration;
        } else {
          console.error("Invalid date or time format");
        }
      } else {
        console.error("Date, start time, or end time is missing");
      }

      setSelectedSlots({
        ...selectedSlots,
        slots: updatedSlots,
      });
    }
  };

  const handleUploadYoutubeLink = (e) => {
    const youtubeUrl = e.target.value;
    if (youtubeUrl.includes("youtube.com")) {
      const videoId = youtubeUrl.split("v=")[1];
      if (videoId) {
        const ampersandPosition = videoId.indexOf("&");
        const id =
          ampersandPosition !== -1
            ? videoId.substring(0, ampersandPosition)
            : videoId;
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${id}`;
        setInputValue(youtubeEmbedUrl);
        setRecentlyUploaded(youtubeEmbedUrl);
      }
    }
  };

  const handleLink = () => {
    setYouTubeLink([...YouTubeLink, inputValue]);
    setInputValue("");
    setRecentlyUploaded("");
  };

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("workshopTitle", WorkshopForm.workshopTitle);
      formdata.append("category", WorkshopForm.category);
      formdata.append(
        "mode",
        JSON.stringify({
          online: Mode.online,
          offline: Mode.offline,
        })
      );
      formdata.append("city", WorkshopForm.city);
      formdata.append("subLocation", WorkshopForm.subLocation);
      formdata.append("sessionAddress", WorkshopForm.sessionAddress);
      formdata.append("gMapDirection", WorkshopForm.gMapDirection);
      formdata.append("WorkshopSlots", JSON.stringify(selectedSlots));
      formdata.append("language", WorkshopForm.language);
      formdata.append("minAge", WorkshopForm.minAge);
      formdata.append("discription", discription);
      formdata.append("terms", JSON.stringify(Terms));
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("YouTubeLink", JSON.stringify(YouTubeLink));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);
      if (WorkshopImage) {
        for (let i = 0; i < WorkshopImage.length; i++) {
          formdata.append("WorkshopImages", WorkshopImage[i]);
        }
      }
      let response = await http.put(`/workshop/editProduct/${idd}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Workshop updated successfully!");
        window.location.assign("/workshop");
      }
    } catch (error) {
      console.error("Error updating Workshop:", error);
    }
  };
  useEffect(() => {
    if (EditWrokshop && idd) {
      setWorkshopForm({
        workshopTitle:
          EditWrokshop?.workshopTitle || WorkshopForm?.workshopTitle,
        category: EditWrokshop?.category || WorkshopForm?.category,
        city: EditWrokshop?.city || WorkshopForm?.city,
        subLocation: EditWrokshop?.subLocation || WorkshopForm?.subLocation,
        sessionAddress:
          EditWrokshop?.sessionAddress || WorkshopForm?.sessionAddress,
        gMapDirection:
          EditWrokshop?.gMapDirection || WorkshopForm?.gMapDirection,
        language: EditWrokshop?.language || WorkshopForm?.language,
        minAge: EditWrokshop?.minAge || WorkshopForm?.minAge,
        WFeePerParticipant:
          EditWrokshop?.WFeePerParticipant || WorkshopForm?.WFeePerParticipant,
        discount: EditWrokshop?.discount || WorkshopForm?.discount,
        OfferPrice: EditWrokshop?.OfferPrice || WorkshopForm?.OfferPrice,
        Terms: EditWrokshop?.terms || Terms,
      });
      setLive(EditWrokshop.Live || Live);
      setPause(EditWrokshop.Pause || Pause);
      setWorkshopImage({
        WorkshopImage: EditWrokshop?.WorkshopImages || WorkshopImage,
      });

      setMode({
        online: JSON.parse(EditWrokshop.mode)?.online || Mode.online,
        offline: JSON.parse(EditWrokshop.mode)?.offline || Mode.offline,
      });

      setSelectedSlots({
        sessionType:
          JSON.parse(EditWrokshop.WorkshopSlots)?.sessionType ||
          selectedSlots?.sessionType,
        slots:
          JSON.parse(EditWrokshop?.WorkshopSlots)?.slots ||
          selectedSlots?.slots,
      });

      setDiscription(EditWrokshop.discription?.join("") || "");
      let parseImag = JSON.parse(EditWrokshop.YouTubeLink);
      setYouTubeLink(parseImag || YouTubeLink);
    }
  }, [EditWrokshop]);

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setViewImage(event.target.result);
      };
      reader.readAsDataURL(fileArray[0]);
      setWorkshopImage(fileArray);
    } else {
      console.error("No files selected");
    }
  };

  const deleteworkshop = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Workshop?`
    );

    if (confirmed) {
      let data = await http.post(`/workshop/trash/${idd}`);
      if (data.status === 200) {
        alert("Workshop deleted succesfully ");
        window.location.reload();
      }
    } else {
      console.log("Workshop canceled the deletion.");
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };
  return (
    <div className="col-md-11 m-auto mt-3 p-3">
      <div className="row mt-2 p-2">
        <div className="col-md-4">
          <Form.Control
            onChange={handleChange}
            name="workshopTitle"
            defaultValue={
              EditWrokshop && idd !== null
                ? EditWrokshop.workshopTitle
                : WorkshopForm.workshopTitle
            }
            className="session"
            placeholder="Workshop Session/Title"
          />
        </div>
        <div className="col-md-4">
          <Form.Select
            value={WorkshopForm.category}
            size="sm"
            onChange={handleChange}
            name="category"
          >
            <option>Choose...</option>
            {Category?.map((cate) => (
              <option value={cate._id}>{cate.category}</option>
            ))}
          </Form.Select>
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-1 text-bold sub-sub_heading">Mode:</div>
        <div className="col-md-3 d-flex">
          <Form.Check
            name="online"
            onChange={handleMode}
            checked={Mode.online}
            className="m-auto"
            type="checkbox"
          />
          <span className="m-auto sub-sub_heading">Online</span>
          <Form.Check
            name="offline"
            onChange={handleMode}
            checked={Mode.offline}
            className="m-auto"
            type="checkbox"
          />
          <span className="m-auto sub-sub_heading">Offline</span>
        </div>
      </div>

      <div className="row mt-2 p-2">
        <div className="col-md-4">
          <Form.Select
            name="city"
            value={WorkshopForm.city}
            onChange={handleChange}
          >
            <option> City </option>
            <option value={"Bengaluru"}> Bengaluru </option>
            <option value={"Delhi"}> Delhi </option>
            <option value={"Mumbai"}> Mumbai </option>
          </Form.Select>
        </div>
        <div className="col-md-4">
          <Form.Select
            name="subLocation"
            value={WorkshopForm.subLocation}
            onChange={handleChange}
          >
            <option>Sub Location</option>
            <option value={"Channsandra"}>Channsandra</option>
            <option value={"R.R.Nagar"}>R.R.Nagar</option>
            <option value={"Dwarka Nagar"}>Dwarka Nagar</option>
          </Form.Select>
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-8">
          <Form.Control
            onChange={handleChange}
            value={WorkshopForm.sessionAddress}
            className="col-md-8 session"
            name="sessionAddress"
            placeholder="Workshop/Session Address"
          />
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-8">
          <Form.Control
            onChange={handleChange}
            name="gMapDirection"
            value={WorkshopForm.gMapDirection}
            className="session"
            placeholder="Google map direction"
          />
        </div>
      </div>

      <div className="row">
        <div className="row mt-2">
          <p className="col-md-6 sub_heading">
            Date Time of Workshop{" "}
            {selectedSlots?.sessionType ===
              "Multiple Sessions in a Workshop" && (
              <CgAdd
                style={{ color: "skyblue", fontWeight: "bold" }}
                onClick={handleDateAdd}
              />
            )}
          </p>
        </div>

        <div className="col-md-7 m-auto">
          <div className="row">
            <div className="col-md-4">
              <Form.Check
                type="radio"
                id={`radio-1`}
                label="One Session"
                value="One Session"
                name="sessionType"
                checked={selectedSlots.sessionType === "One Session"}
                onChange={handleChangedate}
              />
            </div>
            <div className="col-md-8">
              <Form.Check
                type="radio"
                id={`radio-2`}
                label="Multiple Sessions in a Workshop"
                value="Multiple Sessions in a Workshop"
                name="sessionType"
                checked={
                  selectedSlots.sessionType ===
                  "Multiple Sessions in a Workshop"
                }
                onChange={handleChangedate}
              />
            </div>
          </div>
        </div>
        {selectedSlots.slots.map((slot, index) => (
          <div key={index} className="row mt-2">
            {/* Radio Buttons */}
            <div className="col-md-7 m-auto">
              <p className="sub-sub_heading">Select Date</p>
              <div className="row mt-4">
                <Form.Control
                  type="date"
                  name="Workshodate"
                  value={slot.Workshodate}
                  onChange={(e) => handleChangedate(e, index)}
                />
              </div>
            </div>
            {/* Start Time */}
            <div className="col-md-2 m-auto">
              <p className="sub-sub_heading">Start Time</p>
              <div className="row mt-4">
                <Form.Control
                  type="time"
                  name="startTime"
                  value={slot.startTime}
                  onChange={(e) => handleChangedate(e, index)}
                />
              </div>
            </div>
            {/* End Time */}
            <div className="col-md-2 m-auto">
              <p className="sub-sub_heading">End Time</p>
              <div className="row mt-4">
                <Form.Control
                  type="time"
                  name="endTime"
                  value={slot.endTime}
                  onChange={(e) => handleChangedate(e, index)}
                />
              </div>
            </div>
            {/* Duration */}
            <div className="row mt-3">
              <div className="col-md-9"></div>

              <div className="col-md-3 d-flex">
                <p className="sub-sub_heading me-2">
                  Duration {slot.duration}(Min)
                </p>

                <i
                  onClick={() => handleRemovetrow(index)}
                  class="fa fa-trash"
                  title="Delete"
                  style={{ color: "#dc3545", cursor: "pointer" }}
                ></i>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="row">
          <div className="col-md-6">
            <Form.Select
              name="language"
              value={WorkshopForm.language}
              onChange={handleChange}
            >
              <option>Select Language</option>
              <option value={"English"}>English</option>
              <option value={"Hindi"}>Hindi</option>
              <option value={"Kannada"}>Kannada</option>
              <option value={"Tamil"}>Tamil</option>
              <option value={"Telugu"}>Telugu</option>
              <option value={"Marathi"}>Marathi</option>
              <option value={"Bengali"}>Bengali</option>
              <option value={"Punjabi"}>Punjabi</option>
            </Form.Select>
          </div>
          <div className="col-md-6">
            <Form.Select
              onChange={handleChange}
              value={WorkshopForm.minAge}
              name="minAge"
            >
              <option>Minimum Age</option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
              <option value={"9"}>9</option>
              <option value={"10"}>10</option>
              <option value={"11"}>11</option>
              <option value={"12"}>12</option>
            </Form.Select>
          </div>
        </div>
        <div className="row mt-5">
          <h6 className="main_heading">
            About the event Max 7000 Characters Only
          </h6>

          {characterCount === 7000 && (
            <p className="max-limit">Maximum character limit reached!</p>
          )}
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={discription}
              onChange={handleEditorChange}
              disabled={!editorEnabled}
            />
          </div>
        </div>
        <div className="row terms-condition mt-5 p-4">
          <p>{Terms?.title}</p>
          {Terms?.discription?.map((ele) => (
            <li className="terms">{ele}</li>
          ))}
        </div>
        <div className="row mt-5 text-center m-auto">
          {/* <div className="col-md-1"></div> */}
          <div className="col-md-4">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.WFeePerParticipant}
              name="WFeePerParticipant"
              className="p-2 session"
              placeholder="Workshop Fee Per Participant"
            />
          </div>
          <div className="col-md-4">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.OfferPrice}
              name="OfferPrice"
              className="p-2 session"
              placeholder="Workshop Offer Price"
            />
          </div>
          <div className="col-md-4">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.discount}
              name="discount"
              className="p-2 session"
              placeholder="Discount"
            />
          </div>
          {/* <div className="col-md-1"></div> */}
        </div>

        <div className="row mt-3">
          <div className="col-md-8 m-auto mt-3">
            <p className="d-flex m-auto sub_heading ">
              <span className="cursor me-3" name="img">
                Upload Images
              </span>

              <div>
                <Form.Control
                  className="col-md-4 p-0"
                  multiple
                  onChange={handleChangeImage}
                  type="file"
                />
              </div>
            </p>

            <div className="session-image mt-3 p-2 text-center">
              <img
                src={
                  ViewImage
                    ? ViewImage
                    : `https://api.healinggarden.co.in/Product/${EditWrokshop?.WorkshopImage}`
                }
                alt="Uploaded"
                height={200}
                className="col-md-12 m-auto p-0"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
          <div className="col-md-4"></div>
          {console.log(EditWrokshop?.WorkshopImages, "WorkshopImage")}
          {EditWrokshop &&
            EditWrokshop?.WorkshopImages?.map((Ele, index) => {
              return (
                <div className="col-md-2 m-1 m-auto mt-4">
                  <img
                    className="row p-0 m-0 rounded"
                    height={100}
                    width={150}
                    src={`https://api.healinggarden.co.in/Product/${Ele}`}
                  />
                </div>
              );
            })}
        </div>

        <div className="row mt-3">
          <div className="col-md-8 m-auto mt-3">
            <p className="d-flex m-auto sub_heading">
              <span className="cursor me-3" name="img">
                Youtube Link
              </span>

              <div>
                <Form.Control
                  placeholder="YouTube link..."
                  className="col-md-4 p-0"
                  onChange={handleUploadYoutubeLink}
                  type="text"
                  value={inputValue}
                />
              </div>
            </p>

            <div className="session-image mt-3 p-2 text-center">
              {recentlyUploaded && (
                <iframe
                  width="350"
                  height="215"
                  src={recentlyUploaded}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="row">
              {YouTubeLink?.map((Ele, index) => {
                return (
                  <div className="col-md-4 mt-3">
                    <iframe
                      key={index}
                      width="100"
                      height="100"
                      src={Ele}
                      title="YouTube video player"
                      frameBorder="0"
                      className="col-md-12 m-auto p-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>

        <div className="row text-center mt-5">
          <button
            className="col-md-2 p-1 submit m-auto shadow-sm"
            onClick={handleLink}
          >
            Upload Link
          </button>
        </div>

        <div className="row text-center mt-5">
          {EditWrokshop && idd ? (
            <button
              className="col-md-2 p-1 submit m-auto shadow-sm"
              onClick={handleUpdate}
            >
              Update Workshop
            </button>
          ) : (
            <button
              className="col-md-2 p-1 submit m-auto shadow-sm"
              onClick={AddProduct}
            >
              Submit
            </button>
          )}
        </div>
        <div className="row mt-5 m-auto">
          <button
            className="col-md-2 m-auto p-2 session-btn"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className={` ${
              !Live
                ? " col-md-2 m-auto p-2 session-btn"
                : "col-md-2 m-auto p-2 session-btn colorgreen"
            }`}
            onClick={() => setLive(true)}
          >
            {!Live ? "Make Live" : "Live"}
          </button>
          {/* <button className="col-md-2 m-auto p-2 session-btn">Edit</button> */}
          <button
            className="col-md-2 m-auto p-2 session-btn"
            onClick={() => setLive(false)}
          >
            {!Live ? "Paused" : "Pause"}
          </button>
          <button
            onClick={AddProduct}
            disabled={!EditWrokshop}
            className="col-md-3 m-auto p-2 session-btn"
          >
            Duplicate
          </button>
          <button
            disabled={!EditWrokshop}
            className="col-md-2   mt-2 p-2 session-btn"
            onClick={() => deleteworkshop(EditWrokshop._id)}
          >
            Delete
          </button>
        </div>
      </div>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workshop Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Workshop Title:</strong> {WorkshopForm.workshopTitle}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {Category.find((c) => c._id === WorkshopForm.category)?.category}
          </p>
          <p>
            <strong>Mode:</strong> {Mode?.mode?.online ? "Online" : ""}{" "}
            {Mode?.mode?.offline ? "Offline" : ""}
          </p>
          <p>
            <strong>City:</strong> {WorkshopForm?.city}
          </p>
          <p>
            <strong>Sub Location:</strong> {WorkshopForm?.subLocation}
          </p>
          <p>
            <strong>Session Address:</strong> {WorkshopForm?.sessionAddress}
          </p>
          <p>
            <strong>Google Map Direction:</strong> {WorkshopForm?.gMapDirection}
          </p>
          <p>
            <h4>WorkShop Slots</h4>
          </p>
          <p>
            <strong>Session Type:</strong> {selectedSlots?.sessionType}
          </p>
          {selectedSlots?.slots &&
            selectedSlots?.slots.map((slot, index) => (
              <div key={index}>
                <p>
                  <h3>Slot:{index + 1}</h3>{" "}
                </p>
                <p>
                  <strong>Date:</strong> {slot.Workshodate}
                </p>
                <p>
                  <strong>Start Time:</strong> {slot.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {slot.endTime}
                </p>
                <p>
                  <strong>Duration:</strong> {slot.duration} mins
                </p>
              </div>
            ))}
          <p>
            <strong>Language:</strong> {WorkshopForm?.language}
          </p>
          <p>
            <strong>Minimum Age:</strong> {WorkshopForm?.minAge}
          </p>
          <p>
            <strong>Description:</strong> {WorkshopForm?.description}
          </p>
          <p>
            <strong>Workshop Fee Per Participant:</strong>{" "}
            {WorkshopForm?.WFeePerParticipant}
          </p>
          <p>
            <strong>Offer Price:</strong> {WorkshopForm?.OfferPrice}
          </p>
          <p>
            <strong>Discount:</strong> {WorkshopForm?.discount}
          </p>
          <p>
            <strong>Workshop Image:</strong>
            <img
              src={ViewImage}
              alt="Uploaded"
              height={200}
              className="col-md-8 m-auto p-0"
              style={{ borderRadius: "10px" }}
            />
          </p>

          <div className="row">
            <h4>Workshop Images & Videos</h4>
            {YouTubeLink?.map((Ele, index) => {
              return (
                <div className="col-md-4 mt-3">
                  {Ele.type === "YouTubeLink" ? (
                    <iframe
                      key={index}
                      width="100"
                      height="100"
                      src={Ele.url}
                      title="YouTube video player"
                      frameBorder="0"
                      className="col-md-12 m-auto p-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img
                      key={index}
                      src={Ele.url}
                      alt="Uploaded"
                      height={100}
                      className="col-md-12 m-auto p-0"
                      style={{ borderRadius: "10px" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
