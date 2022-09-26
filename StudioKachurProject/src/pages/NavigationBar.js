import { React } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function NavigationBar(props) {

    const languages = [
        { name: 'Ua', href: '/ua' },
        { name: 'Ru', href: '/ru' },
        { name: 'En', href: '/en' },
    ];

    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="sm">
            <Container>
                <Nav>
                    <NavLink className="nav-link padding1" to={props.navLinks.main.link}>
                        <Row>
                            <Col className="padding2">
                                <img
                                    alt=""
                                    src="../logo192.png"
                                    width="32"
                                    height="32"
                                    className="d-inline-block align-top"
                                />
                            </Col>
                            <Col className="padding3">
                                {props.navLinks.main.text}
                            </Col>
                        </Row>
                       
                       
                    </NavLink>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLinks navLinks={props.navLinks.navLinks} />
                    </Nav>
                    <Nav>
                        <Nav.Link href="https://www.tiktok.com/@studiokachur" className="d-flex nav-link py-0">
                            <i className="bi bi-tiktok my-auto" style={{ fontSize: 22 }}></i>
                        </Nav.Link>
                        <Nav.Link href="https://instagram.com/studio_kachur" className="d-flex nav-link py-0">
                            <i className="bi bi-instagram my-auto" style={{ fontSize: 22 }}></i>
                        </Nav.Link>
                        {languages.map((language) => (
                            <NavLink
                                key={language.name}
                                to={language.href}
                                className="nav-link"
                            >
                                {language.name}
                            </NavLink>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function NavLinks(props) {
    return (
        <>
            {props.navLinks.map((row, index) =>
                <NavLink key={index} className="nav-link" to={row.link}>
                    {row.text}
                </NavLink>)
            }
        </>
    );
}

export default NavigationBar