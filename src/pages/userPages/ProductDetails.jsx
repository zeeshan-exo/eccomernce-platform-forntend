import React from "react";
import { useState } from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

function ProductDetails() {
  const [modalIsOpen, setIsOpen] = useState("");

  function OpenModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}
  return <p></p>;
}

export default ProductDetails;
