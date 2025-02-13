import React from "react";
import '../css/style.css'; // Assuming you have a CSS file for styling


const ShoeCare = () => {
    return (
        <div className="shoe-care-page container">
            <div className="row">
                <div className="col-12 text-center my-4">
                    <h1 className="display-4">Shoe Care Tips</h1>
                    <p className="lead">Keep your shoes looking their best with these essential care tips.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h3>1. Clean Regularly</h3>
                    <p>
                        Use a soft brush or cloth to remove dirt and debris from your shoes after every wear. For leather shoes, use a damp cloth and mild soap, and avoid soaking the material.
                    </p>
                </div>

                <div className="col-md-6 mb-4">
                    <h3>2. Protect with Conditioner</h3>
                    <p>
                        For leather and suede shoes, apply a conditioner or protective spray to maintain flexibility and prevent cracking. Make sure to use products specific to your shoe material.
                    </p>
                </div>

                <div className="col-md-6 mb-4">
                    <h3>3. Waterproof Your Shoes</h3>
                    <p>
                        Apply a waterproofing spray to shield your shoes from rain and snow. This is especially important for suede and fabric materials.
                    </p>
                </div>

                <div className="col-md-6 mb-4">
                    <h3>4. Rotate Your Shoes</h3>
                    <p>
                        Avoid wearing the same pair of shoes every day. Giving them time to air out will prolong their lifespan and maintain their shape.
                    </p>
                </div>

                <div className="col-md-6 mb-4">
                    <h3>5. Store Properly</h3>
                    <p>
                        Store your shoes in a cool, dry place away from direct sunlight. Use shoe trees or stuff them with newspaper to retain their shape.
                    </p>
                </div>

                <div className="col-md-6 mb-4">
                    <h3>6. Repair When Needed</h3>
                    <p>
                        Don’t wait too long to repair worn-out soles or heels. Timely repairs can extend the life of your shoes and keep them looking good as new.
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center mt-5">
                    <h4>Need More Help?</h4>
                    <p>
                        Visit our <a href="/contact-us">Contact Us</a> page for additional support or recommendations for your shoe care needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShoeCare;
