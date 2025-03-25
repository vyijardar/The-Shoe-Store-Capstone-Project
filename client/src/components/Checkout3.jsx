import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap";

const CheckoutPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Customer Information & Payment */}
        <div className="col-md-7">
          <Card className="mb-4 p-4">
            <h4>Contact Information</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
            </Form>
          </Card>

          <Card className="mb-4 p-4">
            <h4>Shipping Address</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Street Address" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text" placeholder="Zip Code" />
              </Form.Group>
            </Form>
          </Card>

          <Card className="mb-4 p-4">
            <h4>Payment Details</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="xxxx-xxxx-xxxx-xxxx" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="123" />
              </Form.Group>
            </Form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <Card className="p-4">
            <h4>Order Summary</h4>
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p>$99.99</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Shipping</p>
              <p>$5.99</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5>$105.98</h5>
            </div>
            <Button className="mt-3 w-100" variant="primary">Complete Order</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
