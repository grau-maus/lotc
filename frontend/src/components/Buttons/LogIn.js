import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SigninForm from "../SigninForm";

function LogIn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
      >
        Log in
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <SigninForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogIn;
