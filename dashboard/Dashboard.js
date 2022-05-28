import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Progress,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import { Link ,NavLink} from "react-router-dom";
import { Redirect } from "react-router";

import { useHistory } from 'react-router-dom'
//import {cookies} from 'cookie-parser'


import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import userImg from './userImg.jpg'
import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import upgradeImage from "../../assets/dashboard/upgradeImage.svg";
import heartRed from "../../assets/dashboard/heartRed.svg";
import heartTeal from "../../assets/dashboard/heartTeal.svg";
import heartViolet from "../../assets/dashboard/heartViolet.svg";
import heartYellow from "../../assets/dashboard/heartYellow.svg";
import gymIcon from "../../assets/dashboard/gymIcon.svg";
import therapyIcon from "../../assets/dashboard/therapyIcon.svg";
import user from "../../assets/user.svg";
import statsPie from "../../assets/dashboard/statsPie.svg";
import Select from 'react-select'

import s from "./Dashboard.module.scss";
import Footer from "../../components/Footer/Footer.js";

const Dashboard = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({ message: "" });

  const callingDashPage = async () => {
    try {
      const res = await fetch('/dashboard', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json(); 
      setUserData(data);

      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;

      }
    } catch (err) {
      // JSON.parse(undefined);
      console.log(`error in callingDashPage- ${err}`);
      history.push('/login');
      window.location.reload();
      // {
      //   <Redirect to='/login'/>
      // }
    }
  }

  useEffect(() => {
    callingDashPage();
  }, []);



  /// code to send message
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value })

  };
  const contactFrom  =async (e) => {
    e.preventDefault();
    const {email,message}=userData;
    console.log(userData);
    console.log(email);
    console.log(message);

    const res= await fetch('/contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message,email
      })
    })

    const data=await res.json();

    if(!data){
      console.log('message not sent')
      window.alert('try again')
    }else{
      console.log('message sent')
      window.alert('message sent') 
      setUserData({...userData,message:""})
    }
  };

  

 

  //// send data to 

  // const callingDashboardPage=()=>{
  //   try{
  //     const res=await fetch('/dashboard',)
  //   }catch(err){
  //     console.log(`error in callingDashboardPage - ${err}`);
  //   }


  // }

  // useEffect(()=>{
  //   callingDashboardPage();
  // },[]);





  const [checkboxes, setCheckboxes] = useState([true, false])

  const toggleCheckbox = (id) => {
    setCheckboxes(checkboxes => checkboxes
      .map((checkbox, index) => index === id ? !checkbox : checkbox))
  }

  // const actions = [
  //   { label: "change profile", value: 1 },
  //   { label: "update", value: 2 },
  //   { label: "logout", value: 3 }
  // ];

  const meals = [meal1, meal2, meal3];

  

  const LogoutFunc = () => {
    const history = useHistory();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            history.push('/login', { replace: true })
            if (!res.status != 200) {
                const err = new Error(res.error);
                throw err;
            }

        }).catch((err2)=>{
            console.log(err2);

        })
    },[])
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid collapse navbar-collapse">
          <a className="navbar-brand" href="#">JD</a>
          <form className="d-flex" method="POST">
            <input className="form-control me-2" type="search" placeholder="write message" aria-label="search" value={userData.message} onChange={handleInputs} name="message" />
            <button className="btn btn-outline-success" style={{ "background": "#8A2BE2", "color": "white" }} type="submit" onClick={contactFrom}>Contact</button>
          </form>
          <small id="emailHelp" className="form-text " ></small>



          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

              {/* <li className="nav-item"> */}


              <a class="navbar-brand" href="/profile">
                <img src={userImg} alt="" width="30" height="24" />
              </a>
              {/* <li className="nav-item"> */}
              <nav >
              <a href="/profile" replace className="nav-link active" aria-current="page">
                {userData.name}
              </a>
              </nav>

              {/* </li> */}
              <div className="container">
                <div className="row">
                  {/* <div className="col-md-1"></div> */}
                  <div className="col-md-6">
                    {/* <Select options={actions} /> */}
                    {/* <select>
                      <option value="fruit">  <a className="nav-link active" aria-current="page" href="">profile</a></option>
                      <option value="vegetable">update profile</option>
                      <option  value="meat">Logout</option>
                    </select> */}
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
              <li className="nav-item">
                <form method="GET">
                <a className="nav-link active" style={{ "background": "#8A2BE2", "color": "white", "padding": "10px", "borderRadius": "10px" }} aria-current="page" href="/" onClick={LogoutFunc} >Logout</a>
                </form>
                </li>
            </ul>
          </div>
        </div>
      </nav>
      <Row>
        <Col className="pr-grid-col" xs={12} lg={8}>

          <Row className="gutter mb-4">

            <Col className="mb-4 mb-md-0" xs={12} md={6}>
              <Widget className="">
                <div className="d-flex justify-content-between widget-p-md">
                  <div className="headline-3 d-flex align-items-center">Your activity</div>
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <ApexActivityChart className="pb-4" />
              </Widget>
            </Col>
            <Col xs={12} md={6}>
              <Widget className="widget-p-md">
                <div className="d-flex justify-content-between">
                  <div className="headline-3 d-flex align-items-center">Your meals</div>
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                {meals.map((meal) =>
                  <div key={uuidv4()} className={`mt-4 ${s.widgetBlock}`}>
                    <div className={s.widgetBody}>
                      <div className="d-flex">
                        <img className="img-fluid mr-2" src={meal} alt="..." />
                        <div className="d-flex flex-column">
                          <p className="body-2">Salmon salad</p>
                          <p className="body-3 muted">300 g</p>
                        </div>
                      </div>
                      <div className="body-3 muted">
                        175 cal
                      </div>
                    </div>
                  </div>
                )}
              </Widget>
            </Col>
          </Row>
          <Row className="gutter mb-4">
            <Col xs={12}>
              <Widget className="widget-p-none">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center col-12 col-xl-6 p-sm-4">
                    <p className="headline-1">Upgrade your plan</p>
                    <p className="body-3">So how did the classical Latin become so </p>
                    <div className="d-flex justify-content-between my-4">
                      <Button className="rounded-pill mr-3" color="primary">Go Premium</Button>
                      <Button className="rounded-pill body-3" outline color="dark">Try for free</Button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center col-12 col-xl-6">
                    <img className="p-1 img-fluid" src={upgradeImage} alt="..." />
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
          <Row className="gutter">
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" src={heartRed} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Text</p>
                      <p className="body-2">Num<span className="body-3 muted">/ ber</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-red" className={`progress-xs ${s.mutedPink}`} value="75" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" src={heartYellow} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Text</p>
                      <p className="body-2">Num<span className="body-3 muted">/ ber</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-yellow" className={`progress-xs ${s.mutedYellow}`} value="75" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" src={heartTeal} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Text</p>
                      <p className="body-2">Num<span className="body-3 muted">/ ber</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="secondary-cyan" className={`progress-xs ${s.mutedTeal}`} value="75" />
                  </div>
                </div>
              </Widget>
            </Col>
            <Col xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="d-flex mb-4">
                    <img className="py-1 mr-2 img-fluid" src={heartViolet} alt="..." />
                    <div className="d-flex flex-column">
                      <p className="headline-3">Text</p>
                      <p className="body-2">Num<span className="body-3 muted">/ ber</span></p>
                    </div>
                  </div>
                  <div>
                    <Progress color="violet" className={`progress-xs ${s.mutedViolet}`} value="75" />
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
        <Col className="mt-4 mt-lg-0 pl-grid-col" xs={12} lg={4}>
          <Widget className="widget-p-lg">
            <div className="d-flex">
              <img className={s.image} src={user} alt="..." />
              <div className={s.userInfo}>
                <p className="headline-3">Hi!  {userData.name}</p>
                <p className="body-3 muted">India</p>
              </div>
            </div>
            <div className={s.userParams}>
              <div className="d-flex flex-column">
                <p className="headline-3">63 kg</p>
                <p className="body-3 muted">Weight</p>
              </div>
              <div className="d-flex flex-column">
                <p className="headline-3">175 sm</p>
                <p className="body-3 muted">Height</p>
              </div>
              <div className="d-flex flex-column">
                <p className="headline-3">28 y.</p>
                <p className="body-3 muted">Age</p>
              </div>
            </div>
            <div className={s.goals}>
              <div className={s.goalsTitle}>
                <p className="headline-3">Your Goals</p>
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    &nbsp; Weekly &nbsp;
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Daily</DropdownItem>
                    <DropdownItem>Weekly</DropdownItem>
                    <DropdownItem>Monthly</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="d-flex flex-column mt-3">
                <div className={s.activity}>
                  <p className="body-2">Sleep</p>
                  <p className="body-2">92<span className="body-3 muted"> / 160</span></p>
                </div>
                <Progress color="secondary-red" className="progress-xs" value={60} />
              </div>
              <div className="d-flex flex-column mt-3">
                <div className={s.activity}>
                  <p className="body-2">Sport</p>
                  <p className="body-2">40<span className="body-3 muted"> / 50</span></p>
                </div>
                <Progress color="secondary-yellow" className="progress-xs" value={80} />
              </div>
              <div className="d-flex flex-column mt-3">
                <div className={s.activity}>
                  <p className="body-2">Water</p>
                  <p className="body-2">25<span className="body-3 muted"> / 40</span></p>
                </div>
                <Progress color="secondary-cyan" className="progress-xs" value={40} />
              </div>
            </div>
            <p className="headline-3">Appointments</p>
            <div className={`mt-3 ${s.widgetBlock}`}>
              <div className={s.widgetBody}>
                <div className="d-flex">
                  <img className="img-fluid mr-2" src={gymIcon} alt="..." />
                  <div className="d-flex flex-column">
                    <p className="body-2">02.11 , 12:00 - 13:00</p>
                    <p className="body-3 muted">Yoga, Airplace Gym</p>
                  </div>
                </div>
                <div className="checkbox checkbox-primary">
                  <input
                    id="checkbox0"
                    type="checkbox"
                    className="styled"
                    checked={checkboxes[0]}
                    onChange={() => toggleCheckbox(0)}
                  />
                  <label htmlFor="checkbox0" />
                </div>
              </div>
            </div>
            <div className={`mt-3 ${s.widgetBlock}`}>
              <div className={s.widgetBody}>
                <div className="d-flex">
                  <img className="img-fluid mr-2" src={therapyIcon} alt="..." />
                  <div className="d-flex flex-column">
                    <p className="body-2">03.11 , 16:00 - 17:30</p>
                    <p className="body-3 muted">Therapy</p>
                  </div>
                </div>
                <div className="checkbox checkbox-primary">
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="styled"
                    checked={checkboxes[1]}
                    onChange={() => toggleCheckbox(1)}
                  />
                  <label htmlFor="checkbox1" />
                </div>
              </div>
            </div>
            <a className={`btn-secondary-red ${s.statsBtn}`} href="#top" role="button">
              <img className={s.pieImg} src={statsPie} alt="..." />
              <div>
                <p className="headline-2">STATISTIC</p>
                <p className="body-3">Download your activity</p>
              </div>
            </a>
          </Widget>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

export default Dashboard;
