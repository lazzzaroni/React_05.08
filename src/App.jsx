import { Component, createRef } from "react";
import { ErrorAlert, Modal, UserData } from "./components";
import {
  checkBirthdate,
  checkPhone,
  checkTextarea,
  checkUserName,
  checkWebsite,
  initialState,
  maskPhone,
} from "./helpers";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.phoneRef = createRef();
    this.cancelRef = createRef();
    this.showModal = false;
    this.checkBirthdate = checkBirthdate;
    this.checkPhone = checkPhone;
    this.checkTextarea = checkTextarea;
    this.checkUserName = checkUserName;
    this.checkWebsite = checkWebsite;
    this.initialState = initialState;
    this.maskPhone = maskPhone;
  }

  state = initialState;

  onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const { errors } = this.state;

    this.setState({ [field]: value });

    if (errors[field] != "") {
      errors[field] = "";
    }

    if (field == "phone") {
      this.maskPhone();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors, ...formData } = this.state;

    Object.keys(formData).forEach((field) => {
      switch (field) {
        case "name":
        case "surname":
          this.checkUserName(formData[field], field);
          break;
        case "birthdate":
          this.checkBirthdate(formData[field], field);
          break;
        case "phone":
          this.checkPhone(formData[field], field);
          break;
        case "website":
          this.checkWebsite(formData[field], field);
          break;
        case "about":
        case "techStack":
        case "lastProject":
          this.checkTextarea(formData[field], field);
          break;
        default:
          break;
      }
    });

    Object.keys(formData)
      .filter((key) => formData[key] == "")
      .map((field) => (errors[field] = "Field shouldn't be empty"));

    this.setState({ errors });

    const hasErrors = Object.keys(errors).some((key) => errors[key] != "");

    if (hasErrors) return;

    this.setState(() => (this.showModal = true));
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState(() => (this.showModal = false));
    this.setState(() => this.initialState);
    this.setState({ errors: {} });
    this.phoneRef.current.value = "";
  };

  render() {
    const { name, surname, birthdate, website, about, techStack, lastProject } =
      this.state;

    return (
      <div
        className="container"
        style={this.showModal ? { display: "none" } : null}
      >
        <h1 className="heading">Create Profile</h1>
        <form id="form" onSubmit={this.handleSubmit}>
          <label className="label">
            Name
            <input
              type="text"
              value={name}
              onChange={this.onChange}
              name="name"
              placeholder="Your Name"
              autoFocus
            />
            <ErrorAlert errors={this.state.errors} errorKey="name" />
          </label>
          <label className="label">
            Surname
            <input
              type="text"
              value={surname}
              onChange={this.onChange}
              name="surname"
              placeholder="Your Surname"
            />
            <ErrorAlert errors={this.state.errors} errorKey="surname" />
          </label>
          <label className="label">
            Birthdate
            <input
              type="date"
              value={birthdate}
              onChange={this.onChange}
              className={birthdate ? "date-input--has-value" : ""}
              name="birthdate"
            />
            <ErrorAlert errors={this.state.errors} errorKey="birthdate" />
          </label>
          <label className="label">
            Phone
            <input
              ref={this.phoneRef}
              type="tel"
              onChange={this.onChange}
              name="phone"
              placeholder="1-2345-67-89"
              maxLength="12"
            />
            <ErrorAlert errors={this.state.errors} errorKey="phone" />
          </label>
          <label className="label">
            Website
            <input
              type="text"
              value={website}
              onChange={this.onChange}
              name="website"
              placeholder="https://your_website.com"
            />
            <ErrorAlert errors={this.state.errors} errorKey="website" />
          </label>

          <label className="label label_textarea">
            About
            <textarea
              rows="7"
              value={about}
              onChange={this.onChange}
              name="about"
              placeholder="Write something about yourself"
            />
            <ErrorAlert errors={this.state.errors} errorKey="about" />
            <span className="counter_about">{about.length}/600</span>
          </label>

          <label className="label label_textarea">
            Tech Stack
            <textarea
              rows="7"
              value={techStack}
              onChange={this.onChange}
              name="techStack"
              placeholder="Programming languages, frameworks, tools, etc"
            />
            <ErrorAlert errors={this.state.errors} errorKey="techStack" />
            <span className="counter_techStack">{techStack.length}/600</span>
          </label>

          <label className="label label_textarea">
            Last Project
            <textarea
              rows="7"
              value={lastProject}
              onChange={this.onChange}
              name="lastProject"
              placeholder="Personal blog site, TicTacToe game, etc"
            />
            <ErrorAlert errors={this.state.errors} errorKey="lastProject" />
            <span className="counter_lastProject">
              {lastProject.length}/600
            </span>
          </label>
          <div className="buttons">
            <button
              className="button_reset"
              type="reset"
              ref={this.cancelRef}
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button className="button_submit" type="submit">
              Submit
            </button>
          </div>
        </form>
        {this.showModal ? (
          <Modal>
            <UserData data={this.state} handleCancel={this.handleCancel} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default App;
