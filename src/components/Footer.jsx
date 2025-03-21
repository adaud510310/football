import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white py-4 mt-5 w-100"
      style={{ backgroundColor: "#811619" }}
    >
      <Container fluid>
        <Row>
          <Col md={4} className="text-center">
            <h5>تواصل معنا</h5>
            <p>
              <FaEnvelope />
              <a
                href="mailto:example@example.com"
                className="text-white text-decoration-none"
              >
                example@example.com
              </a>
            </p>
            <p>
              <FaPhone /> +123456789
            </p>
          </Col>

          <Col md={4} className="text-center">
            <h5>روابط سريعة</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="text-center">
            <h5>تابعنا</h5>
            <div className="d-flex flex-column align-items-center">
              <a href="#" className="text-white my-2 text-decoration-none">
                <FaFacebook /> فيسبوك
              </a>
              <a href="#" className="text-white my-2 text-decoration-none">
                <FaTwitter /> تويتر
              </a>
              <a href="#" className="text-white my-2 text-decoration-none">
                <FaInstagram /> إنستغرام
              </a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <p className="text-center mb-0">تم تطويره بواسطة [ADAUD] &copy; 2023</p>
      </Container>
    </footer>
  );
};

export default Footer;
