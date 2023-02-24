import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const DisplayUser = () => {
    const [usersData, setUsersData] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({});
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/getallusers")
            .then((response) => {
                console.log(response);
                setUsersData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const updateUser = (user) => {
        setUpdatedUser(user);
        handleShow();
    };
    const handleModalChange = (e) => { 
        const {name, value} = e.target
        setUpdatedUser(prev => {
            return({
                ...prev,
                [name] : value
            })
        })
        
    }
    const saveUpdatedUser = () => { 
        console.log("***************");
        console.log(updatedUser);
         axios
          .put(`http://localhost:5000/updateuser/${updatedUser._id}`, updatedUser)
          .then((response) => {
            console.log(`Record Updated Successfully`);
          })
          .catch((err) => {
            console.log(err);
          });
          handleClose();
          window.location.reload();

    }
    const deleteUser = (id) => {
        console.log(`THe deleting user record Id: ${id}`);
        axios
            .delete(`http://localhost:5000/deleteuser/${id}`)
            .then((response) => {
                console.log(`Record deleted successfully`);
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload();
    };
    return (
        <div className="display-user">
            <h3> Users Data</h3>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Updating User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>

                            <Form.Control
                                placeholder="first name"
                                name="firstName"
                                defaultValue={updatedUser.firstName ? updatedUser.firstName : ""}
                                onChange={handleModalChange}
                                
                            />
                            <Form.Control
                                placeholder="last name"
                                name="lastName"
                                defaultValue={updatedUser.lastName ? updatedUser.lastName : ""}
                                onChange={handleModalChange}
                            />
                            <Form.Control
                                placeholder="email address"
                                name="email"
                                defaultValue={updatedUser.email ? updatedUser.email : ""}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUpdatedUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {usersData ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <td>First Name</td>
                                <td> Last name</td>
                                <td>Email</td>
                                <td colSpan="2">Operation</td>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="info" onClick={() => updateUser(user)} >
                                                Edit
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => deleteUser(user._id)}
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                " "
            )}
        </div>
    );
};

export default DisplayUser;
