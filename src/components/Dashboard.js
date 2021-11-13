import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import storage from "../firebase";

export default function Dashboard() {
  const [gData, setGData] = useState();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const { currentUser, logout, fetchData } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const download = () => {
    storage
      .ref(`/${currentUser.uid}`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        console.log("Got download url: ", url);
      });
  };

  fetchData(currentUser.uid).then((res) => {
    console.log(res);
    setGData(res);
  });

  useEffect(() => {
    download();
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <img
            src={image}
            className="img-fluid rounded-circle rounded mx-auto d-block"
          />
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Address:</strong> {gData?.address}
          <br />
          <strong>DOB:</strong> {gData?.dob}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
