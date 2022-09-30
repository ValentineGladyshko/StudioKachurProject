import { React, useEffect, useState, Component } from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './album.css';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        };
    }
    render() {
        const data = this.props.data;

        return (
            <Col md={6} lg={4}>
                <Card className="mb-4 box-shadow albumCard">
                    <div className="player-wrapper">
                        <iframe src={"https://www.youtube.com/embed/" + data.url}
                            width="100%"
                            height="100%"
                            className="react-player"
                        />
                    </div>
                    <Card.Body>
                        <Card.Text>{data.text}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
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
            <ThumbnailsCollection thumbnailsCollection={props.albumContent.thumbnailsCollection} />
        </>
    );
}

export default Album