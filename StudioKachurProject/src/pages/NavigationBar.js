import { React } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <NavLink className="nav-link" to={props.navLinks.main.link}>{props.navLinks.main.text}</NavLink>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLinks navLinks={props.navLinks.navLinks} />
                    </Nav>
                    <Nav>
                        <NavLink to="/gb" className="d-flex nav-link py-0">
                            <i className="bi bi-tiktok my-auto" style={{ fontSize: 22 }}></i>
                        </NavLink>
                        <NavLink to="/gb" className="d-flex nav-link py-0">
                            <i className="bi bi-instagram my-auto" style={{ fontSize: 22 }}></i>
                        </NavLink>
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