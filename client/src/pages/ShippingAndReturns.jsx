import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShippingAndReturns() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shipping & Returns</h2>
      <div className="row">
        {/* Shipping Information */}
        <div className="col-md-6 mb-4">
          <h4>Shipping Information</h4>
          <p>
            We offer fast and reliable shipping options to ensure your shoes arrive quickly. Here's what you need to know:
          </p>
          <ul>
            <li>
              <strong>Standard Shipping:</strong> $5 flat rate. Delivery within 5-7 business days.
            </li>
            <li>
              <strong>Express Shipping:</strong> $10 flat rate. Delivery within 2-3 business days.
            </li>
            <li>
              <strong>Overnight Shipping:</strong> $15 flat rate. Delivery by the next business day.
            </li>
          </ul>
          <p>
            Orders placed before 2 PM EST will be processed the same day. Shipping times may vary during holidays and peak periods.
          </p>
          <h5>International Shipping</h5>
          <p>
            We ship worldwide! Shipping costs and delivery times vary by destination. Import taxes or customs fees may apply.
          </p>
        </div>

        {/* Returns and Exchanges */}
        <div className="col-md-6 mb-4">
          <h4>Returns & Exchanges</h4>
          <p>
            We want you to love your purchase! If you're not completely satisfied, our return and exchange policy is designed to make it easy:
          </p>
          <ul>
            <li>
              Returns are accepted within 30 days of purchase.
            </li>
            <li>
              Items must be unworn, in their original condition, and include the original packaging.
            </li>
            <li>
              Clearance or final sale items are not eligible for returns.
            </li>
          </ul>
          <h5>How to Initiate a Return</h5>
          <ol>
            <li>Log in to your account and navigate to your order history.</li>
            <li>Find the order you'd like to return and select "Request Return."</li>
            <li>Follow the instructions to print a prepaid return label.</li>
          </ol>
          <p>
            Once we receive and inspect your return, a refund will be issued to your original payment method within 5-7 business days.
          </p>
          <h5>Exchanges</h5>
          <p>
            Need a different size or style? Contact our support team to arrange an exchange, or place a new order while returning the original item.
          </p>
        </div>
      </div>

      {/* Customer Support */}
      <div className="mt-4">
        <h4>Need Help?</h4>
        <p>
          If you have any questions about shipping or returns, feel free to reach out to our customer service team:
        </p>
        <p>
          <strong>Email:</strong> support@shoestore.com <br />
          <strong>Phone:</strong> 1-800-555-1234
        </p>
        <p>We're here to help Monday through Friday, 9 AM to 5 PM EST.</p>
      </div>
    </div>
  );
}
