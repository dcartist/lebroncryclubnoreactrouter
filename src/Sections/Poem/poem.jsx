import { Header1 } from "../../Components/Headers/Headers"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './poem.css'
export const Poem = () => {
return(
    <div className="mb-5">
        <div className="lebronGod"></div>
        <div className="lebronAlpha"></div>
        <div className="container  d-flex text-center justify-content-center align-items-center flex-column" >
      <Row>
        <Col><Header1 headname="Ode to LeBron James" />
    <p className="enormous-text">
    LeBron takes flight on wings of flame,
A king in motion, proud of name.
With court-wide grace and iron will,
He bends the game, then bends it still.</p>
<p className="enormous-text">
From Cleveland nights to Lakers' gold,
His legend grows, forever bold.
A pass, a dunk, a chase-down block—
Each moment carves his name in rock.
</p>
<p className="enormous-text">
Not just in stats, but how he leads,
In every heart, his story breeds.
So here we cheer, with rightful praise:
LeBron, a king for all our days.
    </p>
    <p className="enormous-text"> - By Alpha</p>
    </Col>
      </Row>
      <Row>
        <Col><Header1 headname="ALpha, If YOU WISH NOT to Have Your NAME as the writer of this POEM.. Please HAVE a HAPPY BIRThdAY" ransom={true} /></Col>
      </Row>
    </div>
</div>
)
}