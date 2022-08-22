import React, { useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";
import styled from "styled-components";

export const SignUp = (props) => {
  // const [newUser, setNewUser] = useState({});
  const user = useRef();
  const pass = useRef();
  const eml = useRef();
  const loginHandler = () => {
    props.login(true);
  };

  const clickHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:3001/mailer", {
        username: user.current.value,
        password: pass.current.value,
        email: eml.current.value,
      })
      .then((res) => {
        alert(res.data);
      });

    
    //   props.login(false);
  };
  return (
    <div className="container">
      <SignUpForm>
        <Header>Enter your details</Header>
        <label className="form-label labelField"> Username</label>
        <div>
          <input
            className="form-control inputField"
            name="userName"
            type="text"
            placeholder="Enter Username"
            ref={user}
          />
        </div>

        <label className="form-label labelField"> Password</label>
        <div>
          <input
            className="form-control inputField"
            type="text"
            name="password"
            placeholder="Enter Password"
            ref={pass}
          />
        </div>

        <label className="form-label labelField"> Email Id</label>
        <div>
          <input
            className="form-control inputField"
            type="text"
            name="email"
            placeholder="Enter EmailId"
            ref={eml}
          />
          {/* <input type="file" /> */}
          <span></span>
        </div>

        <SignUpButton onClick={(e) => clickHandler(e)}>
          {" "}
          Submit Data
        </SignUpButton>
      </SignUpForm>
     
      <p>Already have an account Login</p>
      <button
        onClick={() => {
          loginHandler();
        }}
      >
        Login
      </button>
    </div>
  );
};

const SignUpButton = styled.button`
  padding: 6px 10px;
  border: 2px solid #92a8d1;
  margin-left: 4%;
  margin-top: 1vh;
  width: 30%;
  padding: 10px;
  border-radius: 8px;

  :hover {
    background-color: #92a8d1;
  }
  ::before {
    background-color: #92a8d1;
  }
`;

const SignUpForm = styled.form`

  color: black;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;

  padding: 10px;
`;
const Header = styled.h1`
  color: #b8beb9;
`;
export default SignUp;
