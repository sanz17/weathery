import React from "react";
import { Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';



function Cities() {
    const temp=document.querySelector('.temp')
    const dateOutput=document.querySelector('.date')
    const timeOutput=document.querySelector('.time')
    const conditionOutput=document.querySelector('.condition')
    const nameOutput=document.querySelector('.name')
    const icon=document.querySelector('.icon')
    const humidity=document.querySelector('.humidity')
    const windy=document.querySelector('.wind')
    const form=document.getElementById('location');
    const search=document.querySelector('.search');


    return (
        <div>
            <NavBar />

            <span className="background">
                <span style={{ 'cursor': 'pointer' }}>
                    <DeviceThermostatIcon
                        style={{ 'marginTop': '50px', 'marginLeft': '550px', 'fontSize': '35px' }} />
                    <p style={{ 'marginTop': '-40px', 'marginLeft': '600px', 'fontSize': '35px' }}>Change temperature scale C or F
                    </p>
                </span>
                <span style={{ 'cursor': 'pointer' }}>
                    <p className="location" style={{ 'marginTop': '100px', 'marginLeft': '765px', 'fontSize': '35px' }}>Vellore
                    </p>
                </span>
                <Row style={{ 'marginTop': '50px', 'marginLeft': '230px' }}>
                    <Col>
                        <h1 className="temp">23&#176; C</h1>
                    </Col>
                    <Col>
                        <h1 className="wind">2km/hr</h1>
                    </Col>
                    <Col>
                        <h1 className="humidity">85%</h1>
                    </Col>
                    <Col>
                        <h1 className="date">21 Feb 2023</h1>
                    </Col>
                    <Col>
                        <h1 className="time">21:50</h1>
                    </Col>
                </Row>
            </span>
        </div>
        
    )
}

export default Cities;