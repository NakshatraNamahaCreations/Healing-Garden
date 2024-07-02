import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import http from "../http.common.function";
import { useLocation } from "react-router-dom"


export default function Workshop() {
  const location = useLocation();
  let idd = location.state.idd || null
  let Cate = location.state.category || null
  console.log(location.state)
  const [EditWrokshop, setEditWrokshop] = useState()
  const [selectedSlots, setSelectedSlots] = useState({
    sessionType: "",
    slots: [{
      startTime: "",
      endTime: "",
      Workshodate: "",
      duration: "",
    }]
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
    OfferPrice: 0
  };
  const [Live, setLive] = useState(false)
  const [Pause, setPause] = useState(false)
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
    getWorkShop()
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
      let Wrokshop = await http.get(`/workshop/getbyworkshopbyid/${idd}`);
      setEditWrokshop(Wrokshop.data.data);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };
  console.log(EditWrokshop, "Wrokshop")

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
          Mode,
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
      formdata.append("description", WorkshopForm.Terms);
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("ImagOrYouTubeLink", JSON.stringify(images));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);

      let response = await http.post(`/workshop/addworkshop`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("WorkShop Added Successfully");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateAdd = () => {

    setSelectedSlots({
      ...selectedSlots,
      slots: [
        ...selectedSlots.slots,
        {
          startTime: "",
          endTime: "",
          Workshodate: "",
          duration: "",
        },
      ],
    });

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
        // Convert start and end time to 12-hour format with AM/PM
        const startAMPM = convertToAMPMFormat(startTime);
        const endAMPM = convertToAMPMFormat(endTime);

        const startDateTime = `${Workshodate} ${startAMPM}`;
        const endDateTime = `${Workshodate} ${endAMPM}`;

        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        if (!isNaN(start) && !isNaN(end)) {
          const duration = Math.abs(end - start) / 60000; // Difference in minutes
          updatedSlots[index].duration = duration;
        } else {
          // Handle invalid date error
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
        setInputValue(youtubeEmbedUrl);
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

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("workshopTitle", WorkshopForm.workshopTitle);
      formdata.append("category", WorkshopForm.category);
      formdata.append(
        "mode",
        JSON.stringify({
          Mode,
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
      formdata.append("description", WorkshopForm.Terms);
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("ImagOrYouTubeLink", JSON.stringify(images));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);
      let response = await http.put(
        `/workshop/editProduct/${idd}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("SubCategory updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Subcategory:", error);
    }
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

            selected={EditWrokshop && idd !== null ? Cate : WorkshopForm.category}
            value={WorkshopForm.category}
            size="sm"
            onChange={handleChange}
            name="category"
          >
            <option >Choose...</option>
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
            defaultChecked={
              EditWrokshop && idd !== null
                ? JSON.parse(EditWrokshop.mode).Mode.online === true
                : Mode.online
            }
            className="m-auto"
            type="checkbox"
          />
          <span className="m-auto sub-sub_heading">Online</span>
          <Form.Check
            name="offline"
            onChange={handleMode}


            defaultChecked={
              EditWrokshop && idd !== null
                ? EditWrokshop.offline
                : Mode.offline
            }
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

            onChange={handleChange}

            defaultValue={
              EditWrokshop && idd !== null
                ? EditWrokshop.city
                : Mode.city
            }
          >
            <option > City </option>
            <option value={"Bengaluru"}> Bengaluru </option>
            <option value={"Delhi"}> Delhi </option>
            <option value={"Mumbai"}> Mumbai </option>
          </Form.Select>
        </div>
        <div className="col-md-4">

          <Form.Select
            name="subLocation"
            defaultValue={
              EditWrokshop && idd !== null
                ? EditWrokshop.subLocation
                : WorkshopForm.subLocation
            }
            onChange={handleChange}
          >
            <option >Sub Location</option>
            <option value={"Channsandra"}>Channsandra</option>
            <option value={"R.R.Nagar"}>R.R.Nagar</option>
            <option value={"Dwarka Nagar"}>Dwarka Nagar</option>
          </Form.Select>
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-8">
          <Form.Control
            defaultValue={
              EditWrokshop && idd !== null
                ? EditWrokshop.sessionAddress
                : WorkshopForm.sessionAddress
            }
            onChange={handleChange}

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

            defaultValue={
              EditWrokshop && idd !== null
                ? EditWrokshop.gMapDirection
                : WorkshopForm.gMapDirection
            }
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
                  selectedSlots.sessionType === "Multiple Sessions in a Workshop"
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
              <p className="col-md-3 sub-sub_heading">
                Duration {slot.duration}(Min)
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="row">
          <div className="col-md-6">
            <Form.Select name="language"


              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.language
                  : WorkshopForm.language
              } onChange={handleChange}>
              <option >Select Language</option>
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
            <Form.Select onChange={handleChange}
              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.minAge
                  : WorkshopForm.minAge
              }
              name="minAge">
              <option >Minimum Age</option>
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
              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.data
                  : discription
              }
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

          <div className="col-md-4">
            <Form.Control
              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.WFeePerParticipant
                  : WorkshopForm.WFeePerParticipant
              }
              onChange={handleChange}

              name="WFeePerParticipant"
              className="p-2 session"
              placeholder="Workshop Fee Per Participant"
            />
          </div>
          <div className="col-md-4">
            <Form.Control
              onChange={handleChange}

              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.OfferPrice
                  : WorkshopForm.OfferPrice
              }
              name="OfferPrice"
              className="p-2 session"
              placeholder="Workshop Offer Price"
            />
          </div>
          <div className="col-md-4">
            <Form.Control
              onChange={handleChange}

              defaultValue={
                EditWrokshop && idd !== null
                  ? EditWrokshop.discount
                  : WorkshopForm.discount
              }
              name="discount"
              className="p-2 session" placeholder="Discount" />
          </div>

        </div>

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
                    height="215"
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
                    height={200}
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


        <div className="row text-center mt-5">
          {EditWrokshop && idd ? (
            <button
              className="col-md-2 p-1 submit m-auto shadow-sm"
              onClick={handleUpdate}
            >
              Update Workshop
            </button>) :
            <button
              className="col-md-2 p-1 submit m-auto shadow-sm"
              onClick={AddProduct}
            >
              Submit
            </button>}
        </div>
        <div className="row mt-5 m-auto">
          <button className="col-md-2 m-auto p-2 session-btn">Preview</button>
          <button className="col-md-2 m-auto p-2 session-btn" onClick={() => setLive(true)}>Make Live</button>
          <button className="col-md-2 m-auto p-2 session-btn">Edit</button>
          <button className="col-md-2 m-auto p-2 session-btn" onClick={() => setPause(true)}>Pause</button>
          <button className="col-md-3 m-auto p-2 session-btn">
            Duplicate & Edit
          </button>
          <button className="col-md-2   mt-2 p-2 session-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
