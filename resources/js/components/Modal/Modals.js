import React from 'react'
import { useState } from 'react';
import { Modal, ModalHeader } from "reactstrap";




function Modals(props) {

  // const [modal, setmodal] = useState(false)
  
  return (
    <Modal size="lg" isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>{props.content}</ModalHeader>
    </Modal>
  )

}
export default Modals;

