import {useEffect, useState} from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import 'animate.css';
import ScrollAnimation from 'react-animate-on-scroll';



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

    useEffect(() => {
        fetchGreeting();
        console.log("fetchGreeting");
      }
      , []);

    return (
        <div className="greeting container">
            <div className = "row">
                <div className="col">
        {showGreeting && (
            <ListGroup>
                {greeting.map((item, index) => (
                    index > 0 && 
                    <ScrollAnimation animateIn="fadeIn" duration={5000} key={index}>
   <ListGroup.Item key={index}>
                    <h1>{item[1]}</h1>
                    <p>{item[2]}</p>
                </ListGroup.Item>
</ScrollAnimation>

                   
                ))}
            </ListGroup>
        )}
        </div>
        </div>
        </div>
    );
    }