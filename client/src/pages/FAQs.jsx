import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FAQs() {
  const faqs = [
    {
      question: "What sizes are available for your shoes?",
      answer:
        "We offer a wide range of sizes for men, women, and children. You can check the available sizes on each product page. If a size is out of stock, you can sign up for notifications to know when it's back in stock."
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free standard shipping on orders over $50 within the United States. Express and international shipping options are available for an additional fee."
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase for unworn shoes in their original packaging. Please visit our Returns & Exchanges page for more details."
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, once your order is shipped, we will email you a tracking number. You can use this number to track your shipment on our website or the courier's site."
    },
    {
      question: "How do I clean and care for my shoes?",
      answer:
        "We recommend using a soft brush or cloth to clean your shoes. Avoid submerging them in water, and always let them air dry. For specific care instructions, refer to the product details page."
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer digital gift cards in various denominations. Gift cards can be purchased on our website and are delivered via email."
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@shoestore.com or call us at (123) 456-7890. Our support hours are Monday to Friday, 9 AM to 6 PM EST."
    }
  ];

  return (
    <div className="container my-5">
      <h1 className="mb-4">Frequently Asked Questions (FAQs)</h1>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
