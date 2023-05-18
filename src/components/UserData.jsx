import PropTypes from "prop-types";
import { Component } from "react";

export class UserData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, handleCancel } = this.props;

    return (
      <>
        <section className="list">
          <h3>Name:</h3>
          <p>{data.name}</p>
          <h3>Surname:</h3>
          <p>{data.surname}</p>
          <h3>Birthday:</h3>
          <p>{data.birthdate}</p>
          <h3>Phone:</h3>
          <p>{data.phone}</p>
          <h3>Website:</h3>
          <p>{data.website}</p>
          <h3>About:</h3>
          <p>{data.about}</p>
          <h3>Tech Stack:</h3>
          <p>{data.techStack}</p>
          <h3>Last Project:</h3>
          <p>{data.lastProject}</p>
        </section>
        <button onClick={handleCancel}>Close</button>
      </>
    );
  }
}

UserData.propTypes = {
  data: PropTypes.object,
  handleCancel: PropTypes.func,
};
