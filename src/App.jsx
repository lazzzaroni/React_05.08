import { Component } from "react";
import "./App.css";

class App extends Component {
  initialState = {
    name: "",
    surname: "",
    birthdate: "",
    phone: "",
    website: "",
    about: "",
    techStack: "",
    lastProject: "",
  };

  state = this.initialState;

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState(() => this.initialState);
  };

  onClick = (e) => {
    e.preventDefault();
    this.setState(() => this.initialState);
  };

  render() {
    const {
      name,
      surname,
      birthdate,
      phone,
      website,
      about,
      techStack,
      lastProject,
    } = this.state;

    return (
      <div className="container">
        <h1 className="heading">Create Profile</h1>
        <form id="form">
          <label className="label">
            Name
            <input
              type="text"
              value={name}
              onChange={this.onChange}
              name="name"
              placeholder="Your Name"
              required
              autoFocus
            />
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
          </label>
          <label className="label">
            Birthdate
            <input
              type="date"
              value={birthdate}
              onChange={this.onChange}
              name="birthdate"
            />
          </label>
          <label className="label">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={this.onChange}
              name="phone"
              placeholder="+1234567890"
              // required
            />
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
            <p className="counter">{about.length}/600</p>
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
            <p className="counter">{techStack.length}/600</p>
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
            <p className="counter">{lastProject.length}/600</p>
          </label>
          <div className="buttons">
            <button className="button_reset" type="reset">
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
