import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
// eslint-disable-next-line object-curly-newline
import { FaFacebookF, FaPinterestP, FaTwitter, FaInstagram } from 'react-icons/fa';

import './Footer.css';

const Footer = () => (
  <Row className="footer">
    <Col xl={2} sm={12} className="footerLogo">
      Themovie
      <span className="boldText">box</span>
    </Col>
    <Col className="links" xl={10}>
      <Link className="footerLink" to="About">
        About
      </Link>
      <Link className="footerLink" to="Movies">
        Movies
      </Link>
      <Link className="footerLink" to="Ratings">
        Ratings
      </Link>
      <Link className="footerLink" to="Contact">
        Contact
      </Link>
    </Col>
    <Col xl={12} className="underScore" />
    <Col xl={8}>
      <span className="designer">Disigned by Milan Houter. All rights reserved.</span>
    </Col>
    <Col className="iconLinks" xl={4} sm={12}>
      <Link className="iconLink" to="Facebook">
        <FaFacebookF />
      </Link>
      <Link className="iconLink" to="Pinterest">
        <FaPinterestP />
      </Link>
      <Link className="iconLink" to=" Twitter">
        <FaTwitter />
      </Link>
      <Link className="iconLink" to="Instagram">
        <FaInstagram />
      </Link>
    </Col>
  </Row>
);

export default withRouter(Footer);
