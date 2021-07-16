import React from 'react';
import { Modal } from 'react-bootstrap';

import { UWButton } from '../components';

function MessageModal(props) {
  const {
    showMessageModal, 
    setShowMessageModal,
    modalMessage
  } = props;

  return (
    <>
      <Modal
        show={showMessageModal}
        backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <UWButton label="Close" onClick={() => setShowMessageModal(false)}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;