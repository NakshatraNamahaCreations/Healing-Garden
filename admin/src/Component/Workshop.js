import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import http from "../http.common.function";
import { useLocation } from "react-router-dom";

import Multiselect from "multiselect-react-dropdown";

export default function Workshop() {
  const location = useLocation();
  let idd = location.state?.idd || null;
  const [WorkshopImage, setWorkshopImage] = useState([]);
  const [YouTubeLink, setYouTubeLink] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recentlyUploaded, setRecentlyUploaded] = useState("");
  const [ViewImage, setViewImage] = useState();
  const [terms, setterms] = useState();
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
    minAge: 1,
    WFeePerParticipant: "",
    discount: "",
    OfferPrice: "",
    clientType: "",
    Minparticipant: "",
    Maxparticipant: "",
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

  const [Category, setCategory] = useState([]);
  const [WorkshopForm, setWorkshopForm] = useState(InitialData);

  const [selectedLanguage, setselectedLangauge] = useState([]);
  const [discription, setDiscription] = useState("");

  const [ReasonToJoin, setReasonToJoin] = useState("");
  const [PrimaryObjective, setPrimaryObjective] = useState("");
  const [Suitablefor, setSuitablefor] = useState("");
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
        !WorkshopForm.clientType
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
      formdata.append("language", JSON.stringify(selectedLanguage));
      formdata.append("minAge", WorkshopForm.minAge);
      formdata.append("discription", discription);
      formdata.append("clientType", WorkshopForm.clientType);
      formdata.append("reasonToJoin", ReasonToJoin);
      formdata.append("primaryObjective", PrimaryObjective);
      formdata.append("SuitableFor", Suitablefor);
      formdata.append("terms", terms);
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("YouTubeLink", JSON.stringify(YouTubeLink));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);
      formdata.append("Minparticipant", WorkshopForm.Minparticipant);
      formdata.append("Maxparticipant", WorkshopForm.Maxparticipant);

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
    let videoId;

    // Check for standard YouTube video URL
    if (youtubeUrl.includes("youtube.com/watch?v=")) {
      videoId = youtubeUrl.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      videoId =
        ampersandPosition !== -1
          ? videoId.substring(0, ampersandPosition)
          : videoId;
    }

    // Check for YouTube Shorts URL
    if (youtubeUrl.includes("youtube.com/shorts/")) {
      videoId = youtubeUrl.split("shorts/")[1];
      const questionMarkPosition = videoId.indexOf("?");
      videoId =
        questionMarkPosition !== -1
          ? videoId.substring(0, questionMarkPosition)
          : videoId;
    }

    if (videoId) {
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
      setInputValue(youtubeEmbedUrl);
      setRecentlyUploaded(youtubeEmbedUrl);
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
      formdata.append("language", JSON.stringify(selectedLanguage));
      formdata.append("minAge", WorkshopForm.minAge);
      formdata.append("discription", discription);
      formdata.append("terms", terms);
      formdata.append("WFeePerParticipant", WorkshopForm.WFeePerParticipant);
      formdata.append("discount", WorkshopForm.discount);
      formdata.append("YouTubeLink", JSON.stringify(YouTubeLink));
      formdata.append("Live", Live);
      formdata.append("Pause", Pause);
      formdata.append("OfferPrice", WorkshopForm.OfferPrice);
      formdata.append("clientType", WorkshopForm.clientType);
      formdata.append("reasonToJoin", ReasonToJoin);
      formdata.append("primaryObjective", PrimaryObjective);
      formdata.append("SuitableFor", Suitablefor);
      formdata.append("Minparticipant", WorkshopForm.Minparticipant);
      formdata.append("Maxparticipant", WorkshopForm.Maxparticipant);

      if (WorkshopImage) {
        for (let i = 0; i < WorkshopImage.length; i++) {
          formdata.append("WorkshopImages", WorkshopImage[i]);
        }
      }
      let response = await http.put(`/workshop/editworkshop/${idd}`, formdata, {
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
        language: EditWrokshop?.language || selectedLanguage,
        minAge: EditWrokshop?.minAge || WorkshopForm?.minAge,
        WFeePerParticipant:
          EditWrokshop?.WFeePerParticipant || WorkshopForm?.WFeePerParticipant,
        discount: EditWrokshop?.discount || WorkshopForm?.discount,
        OfferPrice: EditWrokshop?.OfferPrice || WorkshopForm?.OfferPrice,
        clientType: EditWrokshop?.clientType || WorkshopForm?.clientType,
        Minparticipant:
          EditWrokshop.Minparticipant || WorkshopForm.Minparticipant,
        Maxparticipant:
          EditWrokshop.Maxparticipant || WorkshopForm.Maxparticipant,
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

      setselectedLangauge(
        JSON.parse(EditWrokshop.language) || selectedLanguage
      );
      setDiscription(EditWrokshop.discription?.join("") || discription);
      setSuitablefor(EditWrokshop.SuitableFor?.join("") || Suitablefor);

      setPrimaryObjective(
        EditWrokshop.primaryObjective?.join("") || PrimaryObjective
      );
      setterms(EditWrokshop.terms?.join("") || terms);
      setReasonToJoin(EditWrokshop.reasonToJoin?.join("") || ReasonToJoin);

      setSelectedSlots({
        sessionType:
          JSON.parse(EditWrokshop.WorkshopSlots)?.sessionType ||
          selectedSlots?.sessionType,
        slots:
          JSON.parse(EditWrokshop?.WorkshopSlots)?.slots ||
          selectedSlots?.slots,
      });

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
  const options = [
    { name: "English" },
    { name: "Kannada" },
    { name: "Hindi" },
    { name: "Tamil" },
    { name: "Telugu" },
    { name: "Marathi" },
    { name: "Bengali" },
    { name: "Marathi" },
  ];
  const onSelectLanguage = (selectedList, selectedItem) => {
    setselectedLangauge(selectedList);
  };

  const onRemoveLanguage = (selectedList, removedItem) => {
    setselectedLangauge(selectedList);
  };

  const handleCskEditoChange = (setter) => (event, editor) => {
    const data = editor.getData();
    setter(data);
  };
  const handlePause = async (data) => {
    let response = await http.put(
      `/workshop/makelive/${idd}`,
      {
        Live: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      alert("Workshop updated successfully!");
      window.location.assign("/workshop");
    }
  };

  return (
    <div className="col-md-11 m-auto mt-3 p-3">
      <div className="row mt-2 p-2">
        <div className="col-md-4">
          <Form.Select
            value={WorkshopForm.clientType}
            size="sm"
            onChange={handleChange}
            name="clientType"
          >
            <option>Select Client Type...</option>

            <option value="Corporate">Corporate</option>
            <option value="Individual">Individual</option>
          </Form.Select>
        </div>
        <div className="col-md-4">
          <Form.Control
            onChange={handleChange}
            name="workshopTitle"
            value={WorkshopForm.workshopTitle}
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
            <option>Select Category...</option>
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
            <Multiselect
              options={options}
              selectedValues={selectedLanguage}
              onSelect={onSelectLanguage}
              onRemove={onRemoveLanguage}
              displayValue="name"
              placeholder="Select language"
            />
          </div>
          <div className="col-md-6">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.minAge}
              name="minAge"
              type="text"
              placeholder="Enter age"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <p className="max-limit ">
              {WorkshopForm.minAge > 40
                ? "Age limit should be 40 & less than 40  "
                : ""}
            </p>
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
        <div className="row mt-5 p-4">
          <p>Reason to join</p>

          <div>
            <CKEditor
              editor={ClassicEditor}
              data={ReasonToJoin}
              onChange={handleCskEditoChange(setReasonToJoin)}
            />
          </div>
        </div>

        {WorkshopForm.clientType === "Corporate" && (
          <>
            <div className="row mt-5 p-4">
              <p>Primary Objective</p>

              <div>
                <CKEditor
                  editor={ClassicEditor}
                  data={PrimaryObjective}
                  onChange={handleCskEditoChange(setPrimaryObjective)}
                />
              </div>
            </div>

            <div className="row mt-5 p-4">
              <p>Suitable For </p>

              <div>
                <CKEditor
                  editor={ClassicEditor}
                  data={Suitablefor}
                  onChange={handleCskEditoChange(setSuitablefor)}
                />
              </div>
            </div>
          </>
        )}
        <div className="row mt-5 p-4">
          <p>Terms & Conditions</p>

          <div>
            <CKEditor
              editor={ClassicEditor}
              data={terms}
              onChange={handleCskEditoChange(setterms)}
            />
          </div>
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
        <div className="row mt-5 text-center m-auto">
          {/* <div className="col-md-1"></div> */}

          <div className="col-md-4 m-auto filter text-white p-2">
            {" "}
            Number Of Participant{" "}
          </div>
          <div className="col-md-4 m-auto">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.Minparticipant}
              name="Minparticipant"
              className="p-2 "
              placeholder="Min"
            />
          </div>
          <div className="col-md-4 m-auto">
            <Form.Control
              onChange={handleChange}
              value={WorkshopForm.Maxparticipant}
              name="Maxparticipant"
              className="p-2 "
              placeholder="Max "
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
                    : `http://localhost:8002/Product/${EditWrokshop?.WorkshopImage}`
                }
                alt="Uploaded"
                height={200}
                className="col-md-12 m-auto p-0"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
          <div className="col-md-4"></div>

          {EditWrokshop &&
            EditWrokshop?.WorkshopImages?.map((Ele, index) => {
              return (
                <div className="col-md-2 m-1 m-auto mt-4">
                  <img
                    className="row p-0 m-0 rounded"
                    height={100}
                    width={150}
                    src={`http://localhost:8002/Product/${Ele}`}
                  />
                </div>
              );
            })}
        </div>

        <div className="row mt-3">
          <div className="col-md-8 m-auto mt-3">
            <p className="d-flex m-auto sub_heading">
              <span className="cursor me-3">Youtube Link</span>
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
              {YouTubeLink.map((Ele, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <iframe
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
              ))}
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
          {console.log(Live, "Live")}
          <button
            className={`${
              Live === "Live" ? "colorgreen" : ""
            } col-md-2 m-auto p-2 session-btn`}
            onClick={() => handlePause("Live")}
          >
            {Live === "Live" ? "Live" : "Make Live"}
          </button>

          <button
            className={`${
              Live === "Pause" ? "colorred" : ""
            } col-md-2 m-auto p-2 session-btn`}
            onClick={() => handlePause("Pause")}
          >
            {Live === "Pause" ? "Paused" : "Pause"}
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
