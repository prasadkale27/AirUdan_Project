
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import whatsapplogo from '../images/whatsapplogo.png';
import instalogo from '../images/intsalogo.png';
import facebooklogo from '../images/facebooklogo.png';

/**
 * This component renders Footer
 */
function Footer() {
  return (
    <div style={footerStyle.pos}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="m-auto">
            Copyright © All rights reserved Airline Ticket Reservations, 2025.
          </Navbar.Brand>         
        </Container>
      </Navbar>
    </div>
  );
}

const footerStyle = {
  pos: {
    position: 'relative',
  },
  bg: {
    background: 'midnightBlue',
  },
};

export default Footer;
