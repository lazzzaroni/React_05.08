import PropTypes from "prop-types";
import { Component } from "react";

class ErrorAlert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { errors, errorKey } = this.props;
    const error = Object.keys(errors).filter((value) => value === errorKey);

    return (
      <>
        {error.length > 0 ? (
          <span className="error_message" key={error}>
            {errors[errorKey]}
          </span>
        ) : (
          <span style={{ visibility: "hidden" }}></span>
        )}
      </>
    );
  }
}

export default ErrorAlert;

ErrorAlert.propTypes = {
  errors: PropTypes.object,
  errorKey: PropTypes.string,
};
