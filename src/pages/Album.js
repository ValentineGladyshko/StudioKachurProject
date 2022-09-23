import { React } from 'react';
import ReactPlayer from 'react-player/lazy'
import { Container, Col, Row, Button, ButtonGroup, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './album.css';


function Video(props) {
    return (
        <Col md={6} lg={4}>
            <Card className="mb-4 box-shadow albumCard">
                <div className="player-wrapper">
                    <ReactPlayer className="react-player" url={props.data.url} controls={true} width="100%" height="100%" />
                </div>
                <Card.Body>
                    <Card.Text>{props.data.text}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup size="sm">
                            <Button variant="outline-light">{props.data.button1.text}</Button>
                            <Button variant="outline-light">{props.data.button2.text}</Button>
                        </ButtonGroup>
                        <small>9 mins</small>
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