import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  //const navigate = useNavigate();
  const [createUserInfo, setCreateUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setCreateUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/create", createUserInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      //navigate("/");
      window.location.reload();

  };
  return (
    <div className="create-user">
      <h4>Create a new user</h4>
      <div>
        <Form>
          <Form.Group>
            <Form.Control
              name="firstName"
              value={createUserInfo.firstName}
              placeholder="First Name"
              onChange={handleChange}
            />
            <Form.Control
              name="lastName"
              value={createUserInfo.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
            <Form.Control
              name="email"
              value={createUserInfo.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Group>
          <Button onClick={handleClick}>Create User Account</Button>
        </Form>
      </div>
    </div>
  );
};
