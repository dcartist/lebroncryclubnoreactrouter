import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import { Header3, Header2 } from '../../Components/Headers/Headers'

export function Greetings() {
    const fetchGreeting = async () => {
        try {
          setLoading(true);
          const response = await axios.get(import.meta.env.VITE_API_URL);
          setGreeting(response.data);
          if (response.data) {
            setShowGreeting(true);
          }
        } catch (error) {
          console.error("Error fetching greeting:", error);
        } finally {
          setLoading(false);
        }
      }

    const [greeting, setGreeting] = useState([]);
    const [showGreeting, setShowGreeting] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]); // Track visibility of items
    const [loading, setLoading] = useState(true);
    const itemRefs = useRef([]);

    useEffect(() => {
        fetchGreeting();
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
            <div className="row">
                <div className="col">
                  {loading ? (
                    <div className="text-center py-5" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                      <div> <Header2 headname="Loading greetings..."/> </div>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : showGreeting && (
                    <ListGroup className="mb-5 mt-5">
                      {greeting.map((item, index) => (
                        index > 0 && (
                          <ListGroup.Item
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)} 
                            data-index={index}
                            className={`p-3 ${visibleItems.includes(index) ? "fade-in" : "fade-out"}`} 
                          >
                            <Header3 headname={item[1]} />
                            <p>
                              {typeof item[2] === "string"
                                ? item[2].replace(/47/g, "**")
                                : item[2]}
                            </p>
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