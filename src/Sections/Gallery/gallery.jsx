import React, { useState } from 'react';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';

// Dynamically import all images from the anime folder
const images = Object.values(
  import.meta.glob('../../components/Images/anime/*.{jpg,jpeg,png,gif,webp}', { eager: true, as: 'url' })
);

export const Gallery = () => {
  const [show, setShow] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);

  const handleShow = (idx) => {
    setActiveIdx(idx);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
              onClick={() => handleShow(idx)}
            />
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ background: "#111", position: "relative", textAlign: "center" }}>
          {activeIdx !== null && (
            <>
              <Button
                variant="light"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  opacity: 0.7,
                }}
                onClick={handlePrev}
              >
                &#8592;
              </Button>
              <Image
                src={images[activeIdx]}
                alt="Large preview"
                fluid
                style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
              />
              <Button
                variant="light"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  opacity: 0.7,
                }}
                onClick={handleNext}
              >
                &#8594;
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};