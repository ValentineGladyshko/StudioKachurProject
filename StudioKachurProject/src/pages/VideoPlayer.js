import { React, useEffect, useState, Component } from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './album.css';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoName: "",
            magnet: "",
            videoProgress: "",
            items: "",
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {

        const videoId = new URLSearchParams(window.location.search).get("id")
        var lang = "en";
        if (videoId) {
            if (this.props.lang) { lang = this.props.lang }
            fetch("https://www.googleapis.com/drive/v3/files/1JuIjUob41-D2-GFtz0Fb_y6bk4tfdX3I?alt=media&key=AIzaSyBqLniFvapLsrISrS2NEijxYDEvC0LPRg8")
                .then
                (
                    res => res.json())
                .then(
                    (result) => {
                        if (result.hasOwnProperty(videoId))
                        {
                            var downloadInfo = result[videoId];

                            var name = "";
                            if (lang == "ua") {
                                name = downloadInfo.headingUa
                            }
                            else if (lang == "ru") {
                                name = downloadInfo.headingRu
                            }
                            else {
                                name = downloadInfo.headingEn
                            }

                            var torrentId = downloadInfo.magnet;

                            this.setState({
                                videoName: name,
                                magnet: torrentId
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
                                    console.log('Progress: 100%');
                                    clearInterval(interval);
                                })

                                //torrent.files.map((file, i) => {
                                //    if (file.name.endsWith(".mp4")) {
                                //        file.renderTo('video#player');
                                //    }
                                //})
                                for (let i = 0; i < torrent.files.length; i++) {
                                    if (torrent.files[i].name.endsWith(".mp4")) {
                                        torrent.files[i].renderTo('video#player');
                                        break;
                                    }
                                }
                            });
                        }
                        this.setState({
                            isLoaded: true,
                            items: result
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
    }

    render() {
        const error = this.state.error;
        const isLoaded = this.state.isLoaded;
        const items = this.state.items;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container className="player">
                    <Row>
                        <h1 className="text-center jumbotron-heading mt-5">{this.state.videoName}</h1>
                        <p><b>Download Progress: </b>{this.state.videoProgress}</p>
                        <a href={this.state.magnet}>Link </a>
                        <div>
                            <video id="player" controls width="100%"></video>
                        </div>
                    </Row>
                </Container>
            );
        }
    }
}

export default VideoPlayer;