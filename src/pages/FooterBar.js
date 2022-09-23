import { React } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FooterBar(props) {
    return (
        <div className="mt-auto">
            <Container>
                <hr className="bottom-divider" />
            </Container>
            <footer className="text-muted">
                <Container>
                    <Row className="text-center">
                        <Col xl={4} md={6} className="mb-3">
                            <h4 class="text-uppercase mb-2">{props.footerContent.header1}</h4>
                            <Row>
                                {props.footerContent.contacts.map((row, index) =>
                                    <Contact key={index} data={row} />)
                                }
                            </Row>
                        </Col>
                        <Col xl={4} md={6} className="mb-3">
                            <h4 class="text-uppercase mb-3">{props.footerContent.header2}</h4>
                            {props.footerContent.socialMedia.map((row, index) =>
                                <SocialMediaButton key={index} data={row} />)
                            }
                        </Col>
                        <Col xl={4} className="mb-3">
                            <h4 class="text-uppercase mb-3">{props.footerContent.header3}</h4>
                            {props.footerContent.developerContacts.map((row, index) =>
                                <SocialMediaButton key={index} data={row} />)
                            }
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

function SocialMediaButton(props) {
    return (
        <a href={props.data.link} className="btn btn-outline-light rounded-circle roundButton p-2 mx-1">
            <svg className="my-auto" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d={props.data.path} />
            </svg>
        </a>
    );
}

function Contact(props) {
    return (
        <Col className="px-1">
            <svg className="my-auto" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d={props.data.path} />
            </svg>
            <h4>{props.data.heading}
            </h4>
            <p>{props.data.text}</p>
        </Col>
    );
}

export default FooterBar