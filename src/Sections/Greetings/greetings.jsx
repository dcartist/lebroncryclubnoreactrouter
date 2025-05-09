import {useEffect, useState} from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';





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
                    index > 0 && <ListGroup.Item key={index}>
                    <h1>{item[1]}</h1>
                    <p>{item[2]}</p>
                </ListGroup.Item>
                ))}
            </ListGroup>
        )}
        </div>
        </div>
        </div>
    );
    }