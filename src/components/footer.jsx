const Footer = () => {
  const footerLinks = [
    ["Audio and Subtitles", "Media Center", "Privacy", "Contact us"],
    ["Audio Description", "Investor Relations", "Legal Notices"],
    ["Help Center", "Jobs", "Cookie Preferences"],
    ["Gift Cards", "Terms of Use", "Corporate Information"],
  ];

  return (
    <footer>
      <div className="row justify-content-center mt-5">
        <div className="col col-6">
          <div className="row">
            <div className="col mb-2 text-secondary">
              <i className="bi bi-facebook footer-icon me-2"></i>
              <i className="bi bi-instagram footer-icon me-2"></i>
              <i className="bi bi-twitter-x footer-icon me-2"></i>
              <i className="bi bi-youtube footer-icon"></i>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
            {footerLinks.map((column, colIndex) => (
              <div key={colIndex} className="col">
                <div className="row">
                  <div className="col footer-links">
                    {column.map((link, linkIndex) => (
                      <p key={linkIndex}>
                        <a href="#" alt="footer link" className="text-decoration-none text-secondary">
                          {link}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col mb-2">
              <button type="button" className="btn btn-sm footer-button rounded-0 mt-3 border text-secondary">
                Service Code
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col mb-2 mt-2 copyright text-secondary">© 1997-2023 Netflix, Inc.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
