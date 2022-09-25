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
    componentDidMount() {
        fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=" + this.props.data.url + "&key=")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, items } = this.state;
        const data = this.props.data;
        if (error) {
            return <div>Помилка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Завантаження...</div>;
        } else {
            var date = "";
            if (items) {
                date = items;
                date = date[0];
                date = date.snippet;
                date = date.publishedAt;
                date = new Date(date);
                date = date.toLocaleString();
            }
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
                                <small></small>
                                <small>{date}</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }
    }
}

//function Video1(props) {
//    const [error, setError] = useState(null);
//    const [isLoaded, setIsLoaded] = useState(false);
//    const [items, setItems] = useState([]);
//    const request = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=" + props.data.url + "&key=";

//    useEffect(() => {
//        fetch(request)
//            .then(res => res.json())
//            .then(
//                (result) => {
//                    setIsLoaded(true);
//                    setItems(result.items);
//                },
//                (error) => {
//                    setIsLoaded(true);
//                    setError(error);
//                }
//            )
//    }, [])

//    if (error) {
//        return <div>Error: {error.message}</div>;
//    } else if (!isLoaded) {
//        return <div>Loading...</div>;
//    } else {
//        var date = "";
//        if (items) {
//            date = items;
//            date = date[0];
//            date = date.snippet;
//            date = date.publishedAt;
//            date = new Date(date);
//            date = date.toLocaleString();
//        }
//        return (
//            <Col md={6} lg={4}>
//                <Card className="mb-4 box-shadow albumCard">
//                    <div className="player-wrapper">
//                        <iframe src={"https://www.youtube.com/embed/" + props.data.url}
//                            width="100%"
//                            height="100%"
//                            className="react-player"
//                        />
//                    </div>
//                    <Card.Body>
//                        <Card.Text>{props.data.text}</Card.Text>
//                        <div className="d-flex justify-content-between align-items-center">
//                            <small></small>
//                            <small>{date}</small>
//                        </div>
//                    </Card.Body>
//                </Card>
//            </Col>
//        );
//    }
//}

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