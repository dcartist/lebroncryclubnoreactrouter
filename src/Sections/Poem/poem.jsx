import { Header1 } from "../../Components/Headers/Headers"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './poem.css'
export const Poem = () => {
return(
    <div>
        <div className="lebronGod"></div>
        <div className="lebronAlpha"></div>
        <Container >
      <Row>
        <Col><Header1 headname="Ode to LeBron James" />
    <p>
    LeBron takes flight on wings of flame,
A king in motion, proud of name.
With court-wide grace and iron will,
He bends the game, then bends it still.</p>
<p>
From Cleveland nights to Lakers' gold,
His legend grows, forever bold.
A pass, a dunk, a chase-down block—
Each moment carves his name in rock.
</p>
<p>
Not just in stats, but how he leads,
In every heart, his story breeds.
So here we cheer, with rightful praise:
LeBron, a king for all our days.
    </p>
    <p> - By Alpha</p>
    </Col>
      </Row>
      <Row>
        <Col><Header1 headname="ALpha, If YOU WISH NOT to Have Your NAME as the writer of this POEM.. Please HAVE a HAPPY BIRThdAY" ransom={true} /></Col>
      </Row>
    </Container>
</div>
)
}