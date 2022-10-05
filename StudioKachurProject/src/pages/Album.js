import { React, useEffect, useState, Component } from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './album.css';

function Video(props) {
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="box-shadow albumCard">
                <div className="player-wrapper">
                    <iframe src={props.data.url}
                        width="100%"
                        height="100%"
                        className="react-player"
                        allowFullScreen="true"
                    />
                </div>
                <Card.Body>
                    <Card.Text>{props.data.text}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}


function ThumbnailsCollection(props) {
    return (
        <>
            {props.thumbnailsCollection.map((row, index) =>
                <VideoCollection key={index} data={row} />)
            }
        </>
    );
}

function PlayerVideo(props) {
    return (
        <Col md={6} lg={4}>
            <Card className="box-shadow albumCard">
                <div className="albumContainer">
                    <img className="img-fluid mx-auto albumImage" alt={props.data.image.alt} src={props.data.image.src} />
                    <div class="top-left">{props.data.name}</div>
                </div>
                <Card.Body>
                    <Card.Text>{props.data.text}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                    </div>
                </Card.Body>
                <a href={"player?id=" + props.data.id} className="btn btn-outline-dark stretched-link albumButton">Watch <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg></a>
            </Card>
        </Col>
    );
}

function VideoCollection(props) {
    return (
        <section className="py-2" id={props.data.id}>
            <Container>
                <Row className="text-center">
                    <h2 className="pb-2">{props.data.heading}</h2>
                </Row>
                <Row>
                    {props.data.videoCollection.map((row, index) =>
                        <Video key={index} data={row} />)
                    }
                </Row>
            </Container>
        </section>
    );
}

function Album(props) {
    return (
        <>
            <section className="jumbotron text-center" id="top">
                <Container>
                    <h1 className="jumbotron-heading">{props.albumContent.heading}</h1>
                    <p className="lead">{props.albumContent.text}</p>
                    <p>
                        <Button variant="primary">{props.albumContent.button1.text}</Button>{' '}
                        <Button variant="secondary">{props.albumContent.button2.text}</Button>{' '}
                    </p>
                </Container>
            </section>
            <ThumbnailsCollection thumbnailsCollection={props.thumbnailsCollection} />
            <section className="py-2" id="online">
                {/*весь контент надано дл¤ безкоштовного домашнього ознайомчого перегляду.*/}
                <Container>
                    <Row className="text-center">
                        <h2 className="pb-2">Online</h2>
                    </Row>
                    <Row>
                        {props.videoCollection.map((row, index) =>
                            <PlayerVideo key={index} data={row} />)
                        }
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Album