import * as React from 'react';
import location from '../assets/img/location.png'
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from '../assets/img/umbrella_small.png';
import { useNavigate } from "react-router-dom";
import 'animate.css'
import TrackVisibility from 'react-on-screen';
import Form from 'react-bootstrap/Form';


export const Banner = () => {
    const ng=useNavigate()
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Sanhita"];

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className='align-items-center'>

                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <img style={{ 'width': '404px' }} src={headerImg} alt="Header Img" />
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col style={
                        {
                            'border':'1px solid #084298',
                            'padding':'100px',
                            'borderRadius':'2%'
                        }
                    }>
                        <Form className='locationInput'>
                        <input
                            className='city'
                            placeholder="Your city's weather"
                            style={{
                                'backgroundColor':'transparent',
                                'border':'none',
                                'width':'500px',
                                'borderBottom':'1px solid rgba(32, 32, 32, 0.32)',
                                'marginBottom':'20px',
                                'height':'61px'
                            }}
                            // onChange={handleChange}
                            // value={searchInput} 
                            
                            />
                            {/* <img src={location} alt="Logo"/> */}
                            <button style={
                                {
                                    'color':'black',
                                    'fontSize':'30px',
                                    'marginLeft':'289px',
                                    'marginTop':'20px'   
                                }} type='submit' onClick={() => ng('Cities')}>Search<ArrowRightCircle size={25} /></button>
                    
                        </Form>
                        </Col>
                    {/* <Col>
                        <h1 className="temp">23&#176;</h1>
                        <h1 className="wind">3km/hr</h1>
                        <h1 className="humidity">85%</h1>
                    </Col> */}
                </Row>
            </Container>
        </section>
    )
}       