import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SizeChart() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shoe Size Chart</h2>
      <p className="text-center">
        Use our size chart to find your perfect fit. If you're unsure, measure your foot and compare it with the chart below.
      </p>

      {/* Size Chart Grid */}
      <div className="mt-4">
        <div className="row bg-dark text-white text-center py-2">
          <div className="col">US Size</div>
          <div className="col">EU Size</div>
          <div className="col">UK Size</div>
          <div className="col">Foot Length (inches)</div>
          <div className="col">Foot Length (cm)</div>
        </div>
        {/* Example Sizes */}
        <div className="row text-center py-2 border-bottom">
          <div className="col">5</div>
          <div className="col">35</div>
          <div className="col">3</div>
          <div className="col">8.5"</div>
          <div className="col">21.6 cm</div>
        </div>
        <div className="row text-center py-2 border-bottom">
          <div className="col">6</div>
          <div className="col">36</div>
          <div className="col">4</div>
          <div className="col">8.875"</div>
          <div className="col">22.5 cm</div>
        </div>
        <div className="row text-center py-2 border-bottom">
          <div className="col">7</div>
          <div className="col">37</div>
          <div className="col">5</div>
          <div className="col">9.25"</div>
          <div className="col">23.5 cm</div>
        </div>
        <div className="row text-center py-2 border-bottom">
          <div className="col">8</div>
          <div className="col">38</div>
          <div className="col">6</div>
          <div className="col">9.625"</div>
          <div className="col">24.4 cm</div>
        </div>
        <div className="row text-center py-2 border-bottom">
          <div className="col">9</div>
          <div className="col">39</div>
          <div className="col">7</div>
          <div className="col">10"</div>
          <div className="col">25.4 cm</div>
        </div>
        <div className="row text-center py-2">
          <div className="col">10</div>
          <div className="col">40</div>
          <div className="col">8</div>
          <div className="col">10.25"</div>
          <div className="col">26 cm</div>
        </div>
      </div>

      {/* Measuring Guide */}
      <div className="mt-5">
        <h4>How to Measure Your Foot</h4>
        <p>Follow these steps to determine your foot size:</p>
        <ol>
          <li>Place a piece of paper on the floor and stand on it with your heel against a wall.</li>
          <li>Mark the longest part of your foot (your toe) on the paper with a pen or pencil.</li>
          <li>Measure the distance from the edge of the paper to the mark using a ruler or tape measure.</li>
          <li>Compare the measurement to the "Foot Length" column in our size chart to find your size.</li>
        </ol>
        <p>
          <strong>Tip:</strong> If your measurement falls between sizes, we recommend sizing up for the best fit.
        </p>
      </div>

      {/* Additional Notes */}
      <div className="mt-4">
        <h5>Additional Notes:</h5>
        <ul>
          <li>Shoe sizes may vary slightly by brand and style.</li>
          <li>If you are unsure, contact our customer support for assistance.</li>
          <li>Remember to wear socks while measuring for accurate results.</li>
        </ul>
      </div>
    </div>
  );
}
