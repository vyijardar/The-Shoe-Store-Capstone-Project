import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext"; // Adjust path if needed
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal, FaBitcoin } from "react-icons/fa";

const CheckoutPage = () => {
  const { cartItems, total, totalItems } = useCart();

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Side: Contact, Delivery & Payment */}
        <div className="col-md-7">
          {/* Express Checkout */}
          <Card className="mb-4 p-3 text-center">
            <Button variant="primary" className="m-1">Shop Pay</Button>
            <Button variant="warning" className="m-1">G Pay</Button>
            <Button variant="info" className="m-1">Venmo</Button>
            <Button variant="light" className="m-1"><FaPaypal /> PayPal</Button>
            <hr />
            <p>OR</p>
          </Card>

          {/* Contact */}
          <Card className="mb-4 p-4">
            <h4>Contact</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
            </Form>
          </Card>

          {/* Delivery */}
          <Card className="mb-4 p-4">
            <h4>Delivery</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Country/Region</Form.Label>
                <Form.Select>
                  <option>United States</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
                <Form.Control type="text" placeholder="Last Name" className="mt-2" />
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

          {/* Payment */}
          <Card className="mb-4 p-4">
            <h4>Payment</h4>
            <Form>
              <Form.Check type="radio" label="Credit Card" name="payment" defaultChecked />
              <InputGroup className="mt-2">
                <Form.Control type="text" placeholder="Card Number" />
                <span className="input-group-text">
                  <FaCcVisa /> <FaCcMastercard /> <FaCcAmex /> <FaCcDiscover />
                </span>
              </InputGroup>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Form.Control type="text" placeholder="MM/YY" />
                </div>
                <div className="col-md-6">
                  <Form.Control type="text" placeholder="CVV" />
                </div>
              </div>
              <Form.Check type="radio" label="PayPal" name="payment" className="mt-3" />
              <Form.Check type="radio" label="Shop Pay" name="payment" className="mt-2" />
              <Form.Check type="radio" label="Afterpay" name="payment" className="mt-2" />
              <Form.Check type="radio" label="Bitcoin" name="payment" className="mt-2" />
            </Form>
          </Card>

          <Button className="w-100" variant="dark">Pay now</Button>
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-md-5">
          <Card className="p-4">
            <h4>Order Summary</h4>
  
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h5>Total Items: {totalItems}</h5>
            <h4>Total: ${total.toFixed(2)}</h4>
       
            <Form.Control type="text" placeholder="Discount Code" className="mb-2" />
            <Button variant="outline-secondary" className="w-100 mb-3">Apply</Button>
            <Form.Check type="checkbox" label="Verify with ID.me" className="mb-3" />
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p>$161.00</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5>$161.00</h5>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
