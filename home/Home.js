import React from 'react'
import kakashiImage from './kakashi.jpg';
import './bootstrap.min.css'
import { Container } from 'reactstrap';
import { Button, Card } from 'react-bootstrap';
import './home.css'

const Home = () => {
    return (
        <>
            <br />
            <div className='container'>
                <section id="header" className="d-flex align-items-center ">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-10 mx-auto">
                                <div className="row">
                                    <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                        <h1 className='text-center'>

                                            <strong className="brand-name text-center">  Mohd Junaid</strong>
                                        </h1>
                                        <h2 className="my-3 text-center">
                                            welcome to my world
                                        </h2>
                                        <div className="mt-3 text-center">
                                            <a href='/login' className="btn btn-outline-primary" style={{ "borderRadius": "20px" }}>Login</a> <br /><br />
                                            <a href='/register' className="btn btn-outline-primary" style={{ "borderRadius": "20px" }}>Register</a>

                                        </div>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-2 header-img">
                                        <img src={kakashiImage} className="img-fluid animated" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Home;

