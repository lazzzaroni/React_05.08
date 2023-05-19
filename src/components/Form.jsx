import { useRef, useState } from "react";
import { ErrorAlert, Modal, UserData } from "../components";
import {
  checkTextarea,
  initialState,
  maskPhone,
  validateFields,
} from "../helpers";

export function Form() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const phoneRef = useRef(null);
  const cancelRef = useRef(null);

  const { name, surname, birthdate, website, about, techStack, lastProject } =
    formData;

  function handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = { ...formData };
    const newErrors = { ...errors };

    if (newErrors[field] != "") {
      newErrors[field] = "";
    }

    switch (field) {
      case "phone":
        newFormData[field] = maskPhone(phoneRef);
        break;
      case "about":
      case "techStack":
      case "lastProject":
        newFormData[field] = value;
        checkTextarea(newErrors, value, field);
        break;
      default:
        newFormData[field] = value;
        break;
    }

    setFormData(newFormData);
    setErrors(newErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { ...newErrors } = errors;

    validateFields(formData, newErrors);
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

    setFormData(initialState);
    setErrors({});
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
          <UserData data={formData} handleCancel={handleCancel} />
        </Modal>
      ) : null}
    </div>
  );
}
