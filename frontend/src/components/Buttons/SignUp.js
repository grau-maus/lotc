import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignupForm from "../SignupForm";

function SignUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
      >
        Sign up
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUp;
