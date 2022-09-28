import { React, useEffect, useState, Component } from 'react';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './album.css';

class VideoPlayer extends Component {
    state = {
        torrentInfoHash: "",
        torrentMagnetURI: "",
        torrentName: "",
        torrentProgress: "",
        torrentFiles: []
    }

    componentDidMount() {
        // Sintel, a free, Creative Commons movie
        var torrentId = 'magnet:?xt=urn:btih:cd573b9c27f43a5186ce5b75fabe223cda3d9c2b&dn=%D0%92%D0%B8%D0%BD%D0%B8%D1%89%D1%83%D0%B2%D0%B0%D1%87+%D0%94%D0%B5%D0%BC%D0%BE%D0%BD%D1%96%D0%B2+-+%D0%91%D0%B5%D0%B7%D0%BC%D0%B5%D0%B6%D0%BD%D0%B8%D0%B9+%D0%9F%D0%BE%D1%82%D1%8F%D0%B3+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+%D0%94%D1%83%D0%B1%D0%BB%D1%8F%D0%B6+%D0%A1%D1%82%D1%83%D0%B4%D0%B8%D1%8F+%D0%9A%D0%B0%D1%87%D1%83%D1%80+2.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'

        var WebTorrent = require('webtorrent/webtorrent.min.js');
        var client = new WebTorrent();

        client.on('error', err => {
            console.log('[+] Webtorrent error: ' + err.message);
        });

        client.add(torrentId, (torrent) => {
            const interval = setInterval(() => {
                // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
                this.setState({ torrentProgress: (torrent.progress * 100).toFixed(1) + '%' });
            }, 5000);
            torrent.on('done', () => {
                console.log('Progress: 100%');
                clearInterval(interval);
            })

            this.setState({
                torrentInfoHash: torrent.infoHash,
                torrentMagnetURI: torrent.magnetURI,
                torrentName: torrent.name,
                torrentFiles: torrent.files
            });

            torrent.files.map((file, i) => {
                if (file.name.endsWith(".mkv") || file.name.endsWith(".mp4"))
                    file.renderTo('video#player');
            })

        });
    }

    render() {
        return (

            <Container className="members">
                <Row>
                    <h1 className="text-center jumbotron-heading mt-5">{this.state.torrentName}</h1>
                    <p><b>Download Progress: </b>{this.state.torrentProgress}</p>
                    <div>
                        <video id="player" controls width="100%"></video>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default VideoPlayer;