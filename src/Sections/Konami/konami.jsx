import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Header1 } from '../../Components/Headers/Headers';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export function Konami() {
    const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step in the sequence
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState(''); // Track the input field value
  const inputRef = useRef(null);

  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  const handleButtonClick = () => {
    const expectedKey = konamiCode[currentStep];
  
    const newSequence = [...keySequence, expectedKey].slice(-konamiCode.length);
  
    // Update the input field
    setInputValue((prevValue) => {
      const updatedValue = prevValue.trim().split(' ');
      if (updatedValue.length <= currentStep) {
        updatedValue.push(expectedKey);
      } else {
        updatedValue[currentStep] = expectedKey;
      }
      return updatedValue.join(' ');
    });
  
    // Check if sequence so far is valid
    if (!konamiCode.slice(0, newSequence.length).every((k, index) => k === newSequence[index])) {
      // Incorrect sequence: reset
      setErrorMessage('Incorrect code. Try again!');
      setKeySequence([]);
      setCurrentStep(0);
      setInputValue('');
      return;
    }
  
    // Sequence correct so far
    setKeySequence(newSequence);
  
    if (newSequence.join('') === konamiCode.join('')) {
      // Full sequence matched
      // setShowModal(true);
      setErrorMessage('');
      setKeySequence([]);
      setCurrentStep(0);
      setInputValue('');
      window.location.href = '/secret';
    } else {
      // Go to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const getIconColor = (index) => {
    return keySequence[index] === konamiCode[index] ? 'purple' : 'grey';
  };

  const getIconForKey = (key) => {
    switch (key) {
      case "ArrowUp":
        return <FaArrowUp size={50} />;
      case "ArrowDown":
        return <FaArrowDown size={50} />;
      case "ArrowLeft":
        return <FaArrowLeft size={50} />;
      case "ArrowRight":
        return <FaArrowRight size={50} />;
      case "b":
        return <span style={{ fontSize: '50px', fontWeight: 'bold' }}>B</span>;
      case "a":
        return <span style={{ fontSize: '50px', fontWeight: 'bold' }}>A</span>;
      default:
        return null;
    }
  };

  const getButtonIconForKey = () => {
    // Dynamically determine the icon based on the current step
    const key = konamiCode[currentStep];
    return getIconForKey(key);
  };

  return (
    <div className="container-fluid vh-100 d-flex text-center justify-content-center align-items-center" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="row">
        <div className="col">
          <Header1 headname="PRESS THE BUTTON TO ENTER THE KONAMI CODE" />

          {/* Top Icons */}
          <div style={{ display: 'flex', margin: '20px auto', gap: '10px', justifyContent: 'center', flexDirection: 'row' }}>
            <FaArrowUp color={getIconColor(0)} size={30} />
            <FaArrowUp color={getIconColor(1)} size={30} />
            <FaArrowDown color={getIconColor(2)} size={30} />
            <FaArrowDown color={getIconColor(3)} size={30} />
            <FaArrowLeft color={getIconColor(4)} size={30} />
            <FaArrowRight color={getIconColor(5)} size={30} />
            <FaArrowLeft color={getIconColor(6)} size={30} />
            <FaArrowRight color={getIconColor(7)} size={30} />
            <div
              style={{
                color: getIconColor(8),
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: `2px solid ${getIconColor(8)}`,
              }}
            >
              B
            </div>
            <div
              style={{
                color: getIconColor(9),
                fontSize: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: `2px solid ${getIconColor(9)}`,
              }}
            >
              A
            </div>
          </div>

          {/* Large Button */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className='m-auto' >
  <Button
    onClick={handleButtonClick}
    style={{ padding: '40px 40px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer', width: '200px', height: '200px' }}
    className="konami-button"
  >
    {getButtonIconForKey()} {/* Dynamically display the correct icon */}
  </Button>
</div>
 <div style={{ marginTop: '30px' }}>
            <Button
              variant="dark"
              onClick={() => navigate('/secret')}
            >
              Skip Code and go to the Secret Page
            </Button>
          </div>
          {/* Error Message */}
          {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}