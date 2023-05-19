import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    document.getElementById("modal").appendChild(elRef.current);

    return () => {
      document.getElementById("modal").removeChild(elRef.current);
    };
  }, []);

  return createPortal(children, elRef.current);
}

Modal.propTypes = {
  children: PropTypes.object,
};
