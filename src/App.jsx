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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={this.onChange}
            name="name"
            id="name"
            placeholder="Your Name"
            autoFocus
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            value={surname}
            onChange={this.onChange}
            name="surname"
            id="surname"
            placeholder="Your Surname"
          />
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={this.onChange}
            name="birthdate"
            id="birthdate"
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={this.onChange}
            name="phone"
            id="phone"
            placeholder="+1234567890"
          />
          <label htmlFor="website">Website</label>
          <input
            type="text"
            value={website}
            onChange={this.onChange}
            name="website"
            id="website"
            placeholder="your_website.com"
          />

          <label htmlFor="about">About</label>
          <textarea
            rows="7"
            value={about}
            onChange={this.onChange}
            name="about"
            id="about"
            placeholder="Write something about yourself"
          />

          <label htmlFor="techStack">Tech Stack</label>
          <textarea
            rows="7"
            value={techStack}
            onChange={this.onChange}
            name="techStack"
            id="techStack"
            placeholder="Programming languages, frameworks, tools etc..."
          />

          <label htmlFor="lastProject">Last Project</label>
          <textarea
            rows="7"
            value={lastProject}
            onChange={this.onChange}
            name="lastProject"
            id="lastProject"
            placeholder="Personal blog site, TicTacToe game, etc..."
          />
          <div className="buttons">
            <button
              className="button_reset"
              type="reset"
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
