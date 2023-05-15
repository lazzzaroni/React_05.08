import { Component, createRef } from "react";
import "./App.css";
import { ErrorAlert } from "./Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.phoneRef = createRef();
    this.cancelRef = createRef();
  }
  initialState = {
    name: "",
    surname: "",
    birthdate: "",
    phone: "",
    website: "https://",
    about: "",
    techStack: "",
    lastProject: "",
    errors: {},
  };

  state = this.initialState;
  checkName = (value) => {
    const { errors } = this.state;
    if (value == "") {
      errors.name = "";
    } else if (!/^\p{Lu}/u.test(value)) {
      errors.name = "Name must start with capital letter";
    }
    this.setState({ errors });
  };

  checkSurname = (value) => {
    const { errors } = this.state;
    if (value == "") {
      errors.surname = "";
    } else if (!/^\p{Lu}/u.test(value) && value.length > 0) {
      errors.surname = "Surname must start with capital letter";
    }
    this.setState({ errors });
  };

  checkPhone = () => {
    const LENGTH = 12;
    const { errors } = this.state;

    const cardValue = this.phoneRef.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,4})(\d{0,2})(\d{0,2})/);
    this.phoneRef.current.value = !cardValue[2]
      ? cardValue[1]
      : `${cardValue[1]}-${cardValue[2]}${`${
          cardValue[3] ? `-${cardValue[3]}` : ""
        }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
    const newValue = this.phoneRef.current.value;

    if (newValue.length != LENGTH) {
      errors.phone = "Phone number must contain 9 digits";
    } else {
      errors.phone = "";
    }

    this.setState({ errors });
    this.setState({ phone: newValue });
  };

  checkWebsite = (value) => {
    const { errors } = this.state;
    if (!value.startsWith(this.initialState.website)) {
      errors.website = "Website address must start with https://";
    } else {
      errors.website = "";
    }
    this.setState({ errors });
  };

  onChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    this.setState({ [field]: value });

    switch (field) {
      case "name":
        this.checkName(value);
        break;
      case "surname":
        this.checkSurname(value);
        break;
      case "phone":
        this.checkPhone(value);
        break;
      case "website":
        this.checkWebsite(value);
        break;
      default:
        break;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(() => this.initialState);
    this.setState({ errors: {} });
    this.phoneRef.current.value = "";
    console.log(this.state.errors);
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState(() => this.initialState);
    this.setState({ errors: {} });
    this.phoneRef.current.value = "";

    console.log(this.state.errors);
  };

  componentDidUpdate = () => {};

  render() {
    const { name, surname, birthdate, website, about, techStack, lastProject } =
      this.state;

    return (
      <div className="container">
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
              // required
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
              // required
            />
            <ErrorAlert errors={this.state.errors} errorKey="surname" />
          </label>
          <label className="label">
            Birthdate
            <input
              type="date"
              value={birthdate}
              onChange={this.onChange}
              name="birthdate"
              // required
            />
          </label>
          <label className="label">
            Phone
            <input
              ref={this.phoneRef}
              type="tel"
              onChange={this.onChange}
              name="phone"
              placeholder="1-2345-67-89"
              minLength="12"
              maxLength="12"
              // required
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

              // required
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
              // required
            />
            {/* TODO: change message if (X.length > 600) */}
            <span className="counter">{about.length}/600</span>
          </label>

          <label className="label label_textarea">
            Tech Stack
            <textarea
              rows="7"
              value={techStack}
              onChange={this.onChange}
              name="techStack"
              placeholder="Programming languages, frameworks, tools, etc"
              // required
            />
            {/* TODO: change message if (X.length > 600) */}
            <span className="counter">{techStack.length}/600</span>
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
            {/* TODO: change message if (X.length > 600) */}
            <span className="counter">{lastProject.length}/600</span>
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
      </div>
    );
  }
}

export default App;
