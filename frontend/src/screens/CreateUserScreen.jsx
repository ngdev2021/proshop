import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useCreateUsersMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";

const CreateUserScreen = () => {
  const navigate = useNavigate();
  const [createUser, { data, isLoading, error, mutate }] = useCreateUsersMutation();

  console.log(data);
  console.log(error);
    console.log(isLoading);
    

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email, isAdmin, password });
      toast.success("User created successfully");
      navigate("/admin/userlist");
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await createUser({ name, email, isAdmin, password });
        console.log(response);
        if (response.status === 'success') {
          toast.success("User created successfully");
          navigate("/admin/userlist");
        } else {
          toast.error("User creation failed");
        }
      } catch (error) {
        console.log(error);
        // toast.error(error.message);
      }
    }
  };


  

  return (
    <>
        <Button className="btn btn-light my-3" onClick={() => navigate("/admin/userlist")}>
            Go Back
        </Button>
        <h1>Create User</h1>
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
       
      <FormContainer>
        <h1>Create User</h1>
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateUserScreen;







// import React, { useState } from 'react';
// import { useCreateUsersMutation } from '../slices/usersApiSlice';

// const CreateUserScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
// const [isAdmin, setIsAdmin] = useState(false);

//   const [createUserMutation, { isLoading, isError, data, error }] = useCreateUsersMutation();

//   const handleCreateUser = () => {
//     const userData = {
//       name,
//       email,
//       password,
//     };

//     console.log('Data before mutation:', userData); // Log the data before calling the mutation

//     createUserMutation(userData)
//       .then((response) => {
//         console.log('Mutation response:', response); // Log the mutation response
//         // Additional handling after successful mutation
//       })
//       .catch((err) => {
//         console.error('Mutation error:', err); // Log the mutation error
//         // Additional error handling
//       });
//   };

//   return (
//     <div>
//       {/* Your input fields and form */}
//       <input
//   type="text"
//   placeholder="Enter name"
//   value={name}
//   onChange={(e) => setName(e.target.value)}
// />

// <input
//   type="email"
//   placeholder="Enter email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
// />

// <input
//   type="password"
//   placeholder="Enter password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
// />
// <input
//     type="checkbox"
//     label="Is Admin"
//     checked={isAdmin}
//     onChange={(e) => setIsAdmin(e.target.checked)}
//     />
//       <button onClick={handleCreateUser}>Create User</button>
//     </div>
//   );
// };

// export default CreateUserScreen;
