import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";

import loginImage from "../../assets/registerImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
// import { registerUser } from "../../actions/register.js";
// import hasToken from "../../services/authService";


// to get data of front end part
const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({ name: "", email: "", password: "", cPassword: "" });
  // const [cPassword, setcPassword] = useState('');
  // const [password, setPassword] = useState('');

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })

  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cPassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name, email: email, password: password, cPassword: cPassword
      })
    });

    const data = await res.json();

    if (res.status === 401) {
      //  window.alert("Invalid Registration");
      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'email already exist';
      myElement.style.backgroundColor = "red";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";

    } else if (res.status === 406) {
      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'password and confirm password must be same';
      myElement.style.backgroundColor = "red";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";

    }

    else if (res.status === 422) {
      console.log("please fill all the fields properly");

      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'please fill all the fields properly';
      myElement.style.backgroundColor = "red";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";
    }
    else if (res.status === 400) {
      console.log("invalid email");

      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'invalid email';
      myElement.style.backgroundColor = "red";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";
    }
    else if (res.status === 415) {
      console.log(" weak password -password must contain  8-16 characters must have 1 upper and lower case letters and 2 digits and does not contain spaces ");

      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'password is weak';
      myElement.style.backgroundColor = "red";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";
    }


    else {
      console.log("Registration Successfull");
      const myElement = document.getElementById("wrong");
      myElement.innerHTML = 'Registration Successfull';
      myElement.style.backgroundColor = "green";
      myElement.style.color = "white";
      myElement.style.padding = "5px";
      myElement.style.borderRadius = "10px";
      myElement.style.textAlign = "center";

      history.push("/login");
      window.location.reload();

    }
  }


  return (
    <div>
      <div className="auth-page">
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Sign Up</p>
                  <div className="logo-block">
                    <SofiaLogo />
                    <p className="mb-0">JD</p>
                  </div>
                </div>
                <div className="auth-info my-2">
                  <p> register to see what this app can do</p>
                  {/* <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com / password"</b> to login!</p> */}
                </div>
                <form method="POST">
                  {/* <form onSubmit={(event => doRegister(event))}> */}
                  <FormGroup className="my-3">

                    <FormText>Name</FormText>
                    <Input
                      id="name"
                      className="input-transparent pl-3"
                      value={user.name}
                      onChange={handleInputs}
                      type="name"
                      required
                      name="name"
                      placeholder="Henry Monk"
                    />
                    <FormText>Email</FormText>
                    <Input
                      id="email"
                      className="input-transparent pl-3"
                      value={user.email}
                      onChange={handleInputs}
                      type="email"
                      required
                      name="email"
                      placeholder="HenryMonk@gmail.com"
                    />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Password</FormText>
                      {/* <Link to="/error">Forgot password?</Link> */}
                    </div>
                    <Input
                      id="password"
                      className="input-transparent pl-3"
                      // value={password}
                      // onChange={(event) => setPassword(event.target.value)}
                      value={user.password}
                      onChange={handleInputs}
                      type="password"
                      required
                      name="password"
                      placeholder="Place your password here"
                    />
                    <FormText>confirm Password</FormText>
                    <Input
                      id="password2"
                      className="input-transparent pl-3"
                      // value={cPassword}
                      // onChange={(event) => setcPassword(event.target.value)}
                      onChange={handleInputs}
                      value={user.cPassword}
                      type="password"
                      required
                      name="cPassword"
                      placeholder="Place your password here"
                    />
                  </FormGroup>
                  <div id="wrong"></div>

                  <div className="bg-widget d-flex justify-content-center">
                    <Button className="rounded-pill my-3" type="submit" color="secondary-red" onClick={postData}>Sign Up</Button>
                  </div>
                  <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                  <div className="d-flex align-items-center my-3">
                    <p className="social-label mb-0">Login with</p>
                    <div className="socials">
                      <a href="#"><GoogleIcon /></a>
                      <a href="#"><TwitterIcon /></a>
                      <a href="#"><FacebookIcon /></a>
                      <a href="#"><GithubIcon /></a>
                      <a href="#"><LinkedinIcon /></a>
                    </div>
                  </div>
                  <a href="/login">Enter the account</a>
                </form>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  )
}

export default Register



