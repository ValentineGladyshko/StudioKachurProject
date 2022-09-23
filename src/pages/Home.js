import { React } from 'react';
import { Container, Col, Row, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './home.css';

function Slide(props) {
    return (
        <div>
            <img
                className="d-block w-100"
                src={props.image.src}
                alt={props.image.alt}
            />
            <Carousel.Caption>
                <h3>{props.label}</h3>
                <p>{props.text}</p>
            </Carousel.Caption>
        </div>
    );
}

function MyCarousel(props) {
    return (
        <Carousel>
            {props.slides.map((row, index) =>
                <Carousel.Item interval={5000} key={index}>
                    <Slide image={row.image} label={row.label} text={row.text} />
                </Carousel.Item>)
            }
        </Carousel>
    );
}

function HeadingBlock(props) {
    return (
        <Col xxl={3} md={6} className="column">
            <img className="rounded-circle heading-image" src={props.data.image.src} alt={props.data.image.alt} />
            <h2>{props.data.heading}</h2>
            <p>{props.data.text}</p>
            <Link className="btn btn-secondary" to={{
                pathname: "album", hash: props.data.button.link
            }}>
                {props.data.button.text}
            </Link>
        </Col>
    );
}

function HeadingPanel(props) {
    return (
        <Row>
            {props.headingBlocks.map((row, index) =>
                <HeadingBlock key={index} data={row} />)
            }
        </Row>
    );
}

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

function Home(props) {
    return (
        <>
            <MyCarousel slides={props.homeContent.slides} />
            <Container className="marketing">
                <Row>
                    <h1 className="text-center jumbotron-heading mt-5">{props.homeContent.heading}</h1>
                </Row>
                <HeadingPanel headingBlocks={props.homeContent.headingBlocks} />
                <InfoPanel infoBlocks={props.homeContent.infoBlocks} />
            </Container>
        </>
    );
}

export default Home