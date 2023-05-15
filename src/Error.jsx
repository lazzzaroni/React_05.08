import PropTypes from "prop-types";

export const ErrorAlert = ({ errors, errorKey }) => {
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
};

ErrorAlert.propTypes = {
  errors: PropTypes.object,
  errorKey: PropTypes.string,
};
