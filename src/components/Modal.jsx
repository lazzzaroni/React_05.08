import PropTypes from "prop-types";
import { Component } from "react";
import { createPortal } from "react-dom";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.getElementById("modal").appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById("modal").removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

Modal.propTypes = {
  children: PropTypes.object,
};
