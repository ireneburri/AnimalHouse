

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start bg-light text-muted">
                {/* Section: Social media */}
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    {/* Left */}
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github" />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />
                                    ANIMAL HOUSE
                                </h6>
                                <p>
                                    Where pets are treated like family.
                                    Expert care for your beloved animal friends. 
                                    Your pet's happiness is our top priority.
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">OUR NAMES</h6>
                                <div>
                                    <p className="text-reset">
                                        Alessandro Barbanti
                                    </p>
                                </div>
                                <div>
                                    <p className="text-reset">
                                        Irene Burri
                                    </p>
                                </div>
                                <div>
                                    <p className="text-reset">
                                        Beatrice Zamagna
                                    </p>
                                </div>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">SERVICES</h6>
                                <div>
                                    <p className="text-reset">
                                        Commerce
                                    </p>
                                </div>
                                <div>
                                    <p className="text-reset">
                                        Pinboards
                                    </p>
                                </div>
                                <div>
                                    <p className="text-reset">
                                        Services
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home me-3" /> Bologna, BO, Italy
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3" />
                                    studenti@unibo.it
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3" /> + 01 234 567 88
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    Slay demons for days
                </div>
            </footer>
        </>

    );
};

export default Footer;