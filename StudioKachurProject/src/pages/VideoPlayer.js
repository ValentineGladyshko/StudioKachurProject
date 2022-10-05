import { React, useEffect, useState, Component } from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoName: "",
            magnet: "",
            videoProgress: "",
            isLoaded: false
        };
    }

    componentDidMount() {
        const videoId = new URLSearchParams(window.location.search).get("id")
        if (videoId) {
            var col = this.props.videoCollection;

            if (col) {
                var downloadInfo = null;
                col.forEach((video) => {
                    if (video.id == videoId)
                        downloadInfo = video;
                });
                if (downloadInfo) {
                    var name = downloadInfo.name;
                    var torrentId = downloadInfo.magnet;

                    this.setState({
                        videoName: name,
                        magnet: torrentId,
                        isLoaded: true
                    });

                    var WebTorrent = require('webtorrent/webtorrent.min.js');
                    var client = new WebTorrent();

                    client.on('error', err => {
                        console.log('[+] Webtorrent error: ' + err.message);
                    });

                    client.add(torrentId, (torrent) => {
                        const interval = setInterval(() => {
                            this.setState({ videoProgress: (torrent.progress * 100).toFixed(1) + '%' });
                        }, 2000);
                        torrent.on('done', () => {
                            this.setState({ videoProgress: '100%' });
                            clearInterval(interval);
                        })

                        for (let i = 0; i < torrent.files.length; i++) {
                            if (torrent.files[i].name.endsWith(".mp4")) {
                                torrent.files[i].renderTo('video#player');
                                break;
                            }
                        }
                    });
                }
            }
        }
    }
    render() {
        const isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return (
                <section className="jumbotron text-center mt-auto">
                    <Container>
                        <h1 className="jumbotron-heading">{this.props.notFoundContent.heading}</h1>
                        <p className="lead">{this.props.notFoundContent.text}</p>
                        <Link to={this.props.notFoundContent.link.href} className="btn btn-lg btn-outline-dark fw-bold">
                            {this.props.notFoundContent.link.text}
                        </Link>
                    </Container>
                </section>
            );
        }
        else {
            return (
                <Container className="player">
                    <Row>
                        <h1 className="text-center jumbotron-heading mt-5">{this.state.videoName}</h1>
                        <p><b>{this.props.playerContent.progressText}</b>{this.state.videoProgress}</p>
                        <div>
                            <video id="player" controls width="100%"></video>
                        </div>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col className="col-auto">
                            <a href={this.state.magnet} className="text-decoration-none btn btn-outline-dark">{this.props.playerContent.downloadText}<svg className="my-auto" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                            </a>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}


export default VideoPlayer;