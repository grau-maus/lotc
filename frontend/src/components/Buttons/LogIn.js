import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import SigninForm from "../SigninForm";

function LogIn() {
  const user = useSelector((state) => state.session.user);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (user) setShow(false);
  // }, [user]);

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
