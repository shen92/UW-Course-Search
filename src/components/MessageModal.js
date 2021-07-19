import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import { UWButton } from "../components";

function MessageModal(props) {
  const { showMessageModal, setShowMessageModal, modalMessage } = props;

  return (
    <Modal show={showMessageModal} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalMessage}</Modal.Body>
      <Modal.Footer>
        <UWButton label="Close" onClick={() => setShowMessageModal(false)} />
      </Modal.Footer>
    </Modal>
  );
}

MessageModal.props = {
  showMessageModal: PropTypes.bool.isRequired,
  setShowMessageModal: PropTypes.func.isRequired,
  modalMessage: PropTypes.string.isRequired,
};

export default MessageModal;
