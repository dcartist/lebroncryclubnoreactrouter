import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import { Header3 } from '../../Components/Headers/Headers'

export function Greetings() {
    const fetchGreeting = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_API_URL);
          setGreeting(response.data);
          if (response.data) {
            setShowGreeting(true);
          }
          console.log ("triggered")
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching greeting:", error);
        }
      }

    const [greeting, setGreeting] = useState([]);
    const [showGreeting, setShowGreeting] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]); // Track visibility of items
  const itemRefs = useRef([]);

    useEffect(() => {
        fetchGreeting();
        console.log("fetchGreeting");
      }
      , []);


      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const index = Number(entry.target.dataset.index);
              if (entry.isIntersecting) {
                // Add to visible items when in view
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              } else {
                // Remove from visible items when out of view
                setVisibleItems((prev) => prev.filter((item) => item !== index));
              }
            });
          },
          { threshold: 0.1 } // Trigger when 10% of the item is visible
        );
    
        itemRefs.current.forEach((ref) => {
          if (ref) observer.observe(ref);
        });
    
        return () => {
          itemRefs.current.forEach((ref) => {
            if (ref) observer.unobserve(ref);
          });
        };
      }, [greeting]);

    return (
        <div className="greeting container min-vh-100">
            <div className = "row">
                <div className="col">
        {showGreeting && (
            <ListGroup>
              {greeting.map((item, index) => (
                index > 0 && (
                  <ListGroup.Item
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)} 
                    data-index={index}
                    className={`p-3 ${visibleItems.includes(index) ? "fade-in" : "fade-out"}`} 
                  >
                    <Header3 headname={item[1]} />
                    <p>{item[2]}</p>
                  </ListGroup.Item>
                )
              ))}
            </ListGroup>
        )}
        </div>
        </div>
        </div>
    );
    }