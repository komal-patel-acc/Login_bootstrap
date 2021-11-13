import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import storage from "../firebase";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateData, fetchData } =
    useAuth();
  const [error, setError] = useState("");
  const [add, setAdd] = useState("");
  const [dob, setDOB] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    const promises = [];
    setLoading(true);
    setError("");

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value))
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(passwordRef.current.value))
    // }
    console.log(currentUser.uid);
    updateData(currentUser.uid, { address: add, dob: dob });

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [image, setImage] = useState("");
  const upload = () => {
    if (image == null) return;
    console.log(storage);
    try {
      let x = image.name.split(".");
      console.log(x[x.length - 1]);
      storage.ref(`/${currentUser.uid}`).put(image);
      console.log("object");
      history.push("/");
    } catch (e) {
      console.log(e);
    }

    // .on("state_changed" , alert("success") , alert);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAdd(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                type="date"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
          <center>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="form-control mt-5"
            />
            <button onClick={upload} className="btn btn-primary w-100 mt-2">
              Upload
            </button>
          </center>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
