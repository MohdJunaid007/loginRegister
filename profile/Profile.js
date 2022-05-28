import React from 'react'
import userImg from './userImg.png'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//import {cookies} from 'cookie-parser'
import { useState } from 'react'
import Footer from '../../components/Footer/Footer'

const Profile = () => {



  const history = useHistory();
  const [userData, setUserData] = useState('');

  const callingProfilePage = async () => {
    try {
      const res = await fetch('/profile', {
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
      console.log(`error in callingDashboardPage - ${err}`);
      history.push('/login');
      window.location.reload();
    }
  }

  useEffect(() => {
    callingProfilePage();
  }, []);

  const [user, setUser] = useState({ name: "", email: "", password: "", cPassword: "" });


  ///// update profile
  let name, value;

  const handleProfileInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  };



  const updateData = async (e) => {

    e.preventDefault();

    const { _id, name, email } = user;

    const res = await fetch("/updateProfile", {
      method: "POST",
      headers: {

        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        _id: _id, name: name, email: email
      })
    });


    //const data2 = await res.json();

    if (res.status === 406) {
      // window.alert('Retry');
      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'password and confirm password must be same';

      myElement.style.color = "red";


    }

    else if (res.status === 422) {
      // window.alert('Retry');
      console.log("please fill all the fields properly");

      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'please fill all the fields properly';
      myElement.style.color = "red";
    }

    else if (res.status === 400) {
      //window.alert('Retry');
      console.log("invalid email");

      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'invalid email';
      myElement.style.color = "red";
    }
    else if (res.status === 200) {
      // window.alert('successfully updated');
      console.log("successfully updated ");

      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'successfully updated';
      myElement.style.color = "green";
      history.push("/dashboard");
      window.location.reload();

    }


    else if (res.status == 401) {
      //window.alert('retry');

      console.log("ID might me wrong");
      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'Retry - change the email';
      myElement.style.color = "red";


    }
    else {
      //window.alert('retry');

      console.log("ID might me wrong");
      const myElement = document.getElementById("emailHelp");
      myElement.innerHTML = 'Retry - ID entered might be incorrect';
      myElement.style.color = "red";


    }



  }


  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="/dashboard" style={{ "background": "#8A2BE2", "color": "white", "borderRadius": "10px", "padding": "5px" }}>go Back</a>
      </nav>


      <div className='container'>
        <section id="header" className="d-flex align-items-center ">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-10 mx-auto">
                <div className="row">
                  <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                    {/* <h1 className='text-center'>

                                            <strong className="brand-name text-center">  Mohd Junaid</strong>
                                        </h1> */}
                    <form method='GET'>
                      <h4 className="my-3 text-center">
                        ID  {userData._id}
                      </h4>
                      <h4 className="my-3 text-center">
                        Name-   {userData.name}
                      </h4>
                      <h4 className="my-3 text-center">
                        Email- {userData.email}
                      </h4>
                    </form>
                    {/* <div className="mt-3 text-center">
                                            <a href='/login' className="btn btn-outline-primary" style={{ "borderRadius": "20px" }}>Login</a> <br /><br />
                                            <a href='/register' className="btn btn-outline-primary" style={{ "borderRadius": "20px" }}>Register</a>

                                        </div> */}
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 header-img">
                    <img src={userImg} className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <form className='container' method='POST'>
        <h2 className='text-center' style={{ "color": "#8A2BE2" }}>update profile</h2>
        <div className="form-group">
          <label for="formGroupExampleInput" name="name">Name</label>
          <input name='name' type="text" className="form-control" id="formGroupExampleInput" placeholder={userData.name} onChange={handleProfileInput} />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={userData.email} onChange={handleProfileInput} />

        </div>
        {/* <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleProfileInput} />
        </div> */}
        {/* <div className="form-group">
          <label for="exampleInputPassword2">Confirm Password</label>
          <input name='cPassword' type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" onChange={handleProfileInput} />
        </div> */}
        <div className="form-group">
          <label for="exampleInputPassword3">Enter your ID</label>
          <input name='_id' type="text" className="form-control" id="exampleInputPassword3" placeholder={userData._id} onChange={handleProfileInput} />
          <small id="emailHelper" className="form-text errorCorrection" style={{ "color": "blue" }}> just copy and paste from above</small>
        </div>
        <form>
          {/* <div class="form-group">
            <label for="exampleFormControlFile1">Add image</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
          </div> */}

          <small id="emailHelp" className="form-text errorCorrection" style={{ "color": "blue" }}></small>
        </form >
        <button type="submit" className="btn btn-primary" style={{ "marginBottom": "20px" }} onClick={updateData}>Submit</button>

      </form>
      <Footer />
    </>
  )
}

export default Profile