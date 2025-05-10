import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';

import { Header1 } from '../../Components/Headers/Headers'
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaCircle } from 'react-icons/fa'; // Use FaCircle for "A" and "B"


export function Konami() {

    const [showModal, setShowModal] = useState(false);
    const [keySequence, setKeySequence] = useState([]);
    const inputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement === inputRef.current) {
        setKeySequence((prevSequence) => {
          const newSequence = [...prevSequence, event.key].slice(-konamiCode.length);

          // Check if the sequence matches the Konami Code
          if (newSequence.join('') === konamiCode.join('')) {
            setShowModal(true);
            setErrorMessage(''); // Clear error message on success
          } else if (!konamiCode.slice(0, newSequence.length).every((key, index) => key === newSequence[index])) {
            // Reset if the sequence is incorrect
            setErrorMessage('Incorrect code. Try again!');
            return [];
          }

          return newSequence;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getIconColor = (index) => {
    return keySequence[index] === konamiCode[index] ? 'purple' : 'grey';
  };



  return(
    <div className="container-fluid vh-100 d-flex text-center justify-content-center align-items-center" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="row">

    <div className="col">

         <Header1  headname="ENTER THE KONAMI CODE"/>
            <div style={{ display: 'flex', margin: '20px auto', gap: '10px', justifyContent: 'center',flexDirection: 'row', }}>
                <FaArrowUp color={getIconColor(0)} size={30} />
                <FaArrowUp color={getIconColor(1)}  size={30} />
                <FaArrowDown color={getIconColor(2)}  size={30} />
                <FaArrowDown color={getIconColor(3)}  size={30} />
                <FaArrowLeft color={getIconColor(4)}  size={30} />
                <FaArrowRight color={getIconColor(5)}  size={30} />
                <FaArrowLeft color={getIconColor(6)}  size={30} />
                <FaArrowRight color={getIconColor(7)}  size={30} />
                <div
                  style={{
                    color: getIconColor(8),
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${getIconColor(8)}`,
                  }}
                >
                  B
                </div>
                <div
                  style={{
                    color: getIconColor(9),
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${getIconColor(9)}`,
                  }}
                >
                  A
                </div>
                </div>
        
        
            <div style={{ margin: '20px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Insert the Konami Code here"
                  style={{ padding: '10px', width: '300px' }}
                />
              </div>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  {errorMessage}
                </div>
              )}
              {/* Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Konami Code Activated!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Congratulations! You unlocked the secret modal.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>
    </div>
    </div>
  )
}