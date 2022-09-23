import { React } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './home.css';

function InfoBlock(props) {
    return (
        <>
            <hr className="featurette-divider" />
            <Row className="featurette">
                <Col md={{ span: 7, order: props.order.first }}>
                    <h2 className="featurette-heading">{props.heading.primary}<span className="text-muted">{props.heading.secondary}</span></h2>
                    <p className="lead">{props.text}</p>
                </Col>
                <Col md={{ span: 5, order: props.order.second }}>
                    <img className="featurette-image img-fluid mx-auto" alt={props.image.alt} src={props.image.src} />
                </Col>
            </Row>
        </>
    );
}

function InfoPanel(props) {
    return props.infoBlocks.map((row, index) =>
        <InfoBlock key={index} image={row.image} order={row.order} heading={row.heading} text={row.text} />)
}

function Members(props) {
    return (
        <>
            <Container className="members">
                <Row>
                    <h1 className="text-center jumbotron-heading mt-5">{props.membersContent.heading}</h1>
                </Row>
                <InfoPanel infoBlocks={props.membersContent.infoBlocks} />
            </Container>
        </>
    );
}

export default Members