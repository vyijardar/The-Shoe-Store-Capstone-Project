import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../css/ShoeShowcase.css';
import men2 from '../assets/images/item-11.jpg';

function ShoeShowcase() {
  return (
    <section className="shoe-showcase py-5">
      <Container>
        <h2 className="text-center mb-4">See how your shoes are made</h2>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Image src={men2} alt="Showcased Shoe" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <ul className="shoe-points list-unstyled fs-5">
              <li>✔ Recycled Upper</li>
              <li>✔ Eco-friendly Rubber Outsole</li>
              <li>✔ Organic Cotton Laces</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ShoeShowcase;
