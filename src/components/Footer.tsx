import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="py-4 " style={{ backgroundColor: "#D9E4DD" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0 text-dark">
              Svit Crochets - В'язані сумки ручної роботи.
              <br />
              Всі права захищені. © {currentYear}
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <a
                href="https://www.instagram.com/svit_crochets?igsh=MWo5bmxkN2czb2lueA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark text-decoration-none"
              >
                📷 Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
