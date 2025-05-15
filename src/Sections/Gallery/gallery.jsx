import React, { useState } from 'react';
import { Container, Row, Col, Image, Modal } from 'react-bootstrap';

// Dynamically import all images from the anime folder
const images = Object.values(
  import.meta.glob('../../components/Images/anime/*.{jpg,jpeg,png,gif,webp}', { eager: true, as: 'url' })
);

export const Gallery = () => {
  const [show, setShow] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const handleShow = (src) => {
    setActiveImg(src);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="py-4">
        
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {images.map((src, idx) => (
          <Col key={idx}>
            <Image
              src={src}
              alt={`Anime ${idx + 1}`}
              thumbnail
              fluid
              style={{ cursor: 'pointer' }}
              onClick={() => handleShow(src)}
            />
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ background: "#111" }}>
          {activeImg && (
            <Image src={activeImg} alt="Large preview" fluid style={{ width: "100%" }} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};