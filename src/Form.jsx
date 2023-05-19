import { useRef, useState } from "react";
import { ErrorAlert, Modal, UserData } from "./components";
import {
  checkBirthdate,
  checkPhone,
  checkTextarea,
  checkUserName,
  checkWebsite,
  initialState,
  maskPhone,
} from "./helpers/copy";

import "./App.css";

export default function Form() {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const phoneRef = useRef(null);
  const cancelRef = useRef(null);

  const { name, surname, birthdate, website, about, techStack, lastProject } =
    state;

  function handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const newState = { ...state };
    const newErrors = { ...errors };

    if (field == "phone") {
      newState[field] = maskPhone(phoneRef);
    } else {
      newState[field] = value;
    }

    if (newErrors[field] != "") {
      newErrors[field] = "";
    }

    setState(newState);
    setErrors(newErrors);
  }

  function validate(data, errors) {
    Object.keys(data).forEach((field) => {
      switch (field) {
        case "name":
        case "surname":
          checkUserName(data[field], field);
          break;
        case "birthdate":
          checkBirthdate(data[field], field);
          break;
        case "phone":
          checkPhone(data[field], field);
          break;
        case "website":
          checkWebsite(data[field], field);
          break;
        case "about":
        case "techStack":
        case "lastProject":
          checkTextarea(data[field], field);
          break;
        default:
          break;
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { ...formData } = state;
    const { ...newErrors } = errors;
    console.log(formData);

    // validate(formData, newErrors);

    Object.keys(formData)
      .filter((key) => formData[key] == "")
      .map((field) => (newErrors[field] = "Field shouldn't be empty"));

    console.log(newErrors);
    setErrors(newErrors);

    const hasErrors = Object.keys(newErrors).some(
      (key) => newErrors[key] != ""
    );

    if (hasErrors) return;

    setShowModal(true);
  }

  function handleCancel(e) {
    e.preventDefault();
    if (showModal) setShowModal(false);
    setState(initialState);
    setErrors({});
    // phoneRef.current = "";
  }

  return (
    <div className="container" style={showModal ? { display: "none" } : null}>
      <h1 className="heading">Create Profile</h1>
      <form id="form" onSubmit={handleSubmit}>
        <label className="label">
          Name
          <input
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="Your Name"
            autoFocus
          />
          <ErrorAlert errors={errors} errorKey="name" />
        </label>
        <label className="label">
          Surname
          <input
            type="text"
            value={surname}
            onChange={handleChange}
            name="surname"
            placeholder="Your Surname"
          />
          <ErrorAlert errors={errors} errorKey="surname" />
        </label>
        <label className="label">
          Birthdate
          <input
            type="date"
            value={birthdate}
            onChange={handleChange}
            className={birthdate ? "date-input--has-value" : ""}
            name="birthdate"
          />
          <ErrorAlert errors={errors} errorKey="birthdate" />
        </label>
        <label className="label">
          Phone
          <input
            ref={phoneRef}
            type="tel"
            onChange={handleChange}
            name="phone"
            placeholder="1-2345-67-89"
            maxLength="12"
          />
          <ErrorAlert errors={errors} errorKey="phone" />
        </label>
        <label className="label">
          Website
          <input
            type="text"
            value={website}
            onChange={handleChange}
            name="website"
            placeholder="https://your_website.com"
          />
          <ErrorAlert errors={errors} errorKey="website" />
        </label>

        <label className="label label_textarea">
          About
          <textarea
            rows="7"
            value={about}
            onChange={handleChange}
            name="about"
            placeholder="Write something about yourself"
          />
          <ErrorAlert errors={errors} errorKey="about" />
          <span className="counter_about">{about.length}/600</span>
        </label>

        <label className="label label_textarea">
          Tech Stack
          <textarea
            rows="7"
            value={techStack}
            onChange={handleChange}
            name="techStack"
            placeholder="Programming languages, frameworks, tools, etc"
          />
          <ErrorAlert errors={errors} errorKey="techStack" />
          <span className="counter_techStack">{techStack.length}/600</span>
        </label>

        <label className="label label_textarea">
          Last Project
          <textarea
            rows="7"
            value={lastProject}
            onChange={handleChange}
            name="lastProject"
            placeholder="Personal blog site, TicTacToe game, etc"
          />
          <ErrorAlert errors={errors} errorKey="lastProject" />
          <span className="counter_lastProject">{lastProject.length}/600</span>
        </label>
        <div className="buttons">
          <button
            className="button_reset"
            type="reset"
            ref={cancelRef}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="button_submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      {showModal ? (
        <Modal>
          <UserData data={state} handleCancel={handleCancel} />
        </Modal>
      ) : null}
    </div>
  );
}
