// src/components/MaterialSection.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../css/MaterialSection.css';
function MaterialSection() {
  return (
    <section className="material-section py-5">
    <Container>
      {/* Brand Logos */}
      <Row className="justify-content-center mb-4 flex-wrap">
        {[
          "https://static.vecteezy.com/system/resources/thumbnails/020/336/375/small/nike-logo-nike-icon-free-free-vector.jpg",
          "https://www.tramatm.cz/_next/image?url=https%3A%2F%2Ftrama-static.s3.eu-central-1.amazonaws.com%2Fimages%2Fhall-of-fame%2Flogos%2F40-logo.png&w=3840&q=75",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOhHZ-0c3De3DFuwuosHkDnJRDwhDb-tLdw&s",
          "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Rewrite_New_Balance_Logo_Design_History_Evolution_2_1024x1024.jpg?v=1695304049",
          "https://images.squarespace-cdn.com/content/v1/5d4afc656a02d00001cc7767/1655403359501-8JSWHKHD3SJ4ZOLXO35D/HOKA-Logo-late-2021-black.png",
        ].map((logo, index) => (
          <Col key={index} xs={6} sm={4} md={2} className="d-flex justify-content-center mb-3">
            <Image src={logo} alt={`Logo ${index + 1}`} className="logo" fluid />
          </Col>
        ))}
      </Row>

      {/* Material Content */}
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src="https://static.independent.co.uk/2024/08/16/17/best-womens-running-shoes-Independent.jpg"
            alt="Shoe Image"
            className="material-img"
            fluid
          />
        </Col>
        <Col md={6}>
          <div className="material-text">
            <h2>About Us</h2>
            <h3>Selected materials designed for comfort and sustainability</h3>
            <p>
              Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget auctor nec sed 
              elit nunc, magna non urna amet ac neque ut quam enim pretium risus gravida 
              ullamcorper adipiscing at ut magna.
            </p>
            <a href="#read-more" className="read-more">Read More</a>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
}

export default MaterialSection;
