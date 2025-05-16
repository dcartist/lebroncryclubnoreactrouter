import React, { Suspense, lazy } from 'react';
import {Greetings} from '../Greetings/greetings';
import Button from 'react-bootstrap/Button';
// import CubeAnimation from '../CubeAnimation/CubeAnimation';
// import MoreCubes from '../CubeAnimation/MoreCubes';
// const CubeAnimation = lazy(() => import('../CubeAnimation/CubeAnimation'));
import { HeaderBig, Header2 } from '../../Components/Headers/Headers';
const MoreCubes = lazy(() => import('../CubeAnimation/MoreCubes'));

 const EasterEggPage = () => {
  return (

    <div>
      <div className='donuts'>
        <span style={{ backgroundColor: 'black' }}>
        <HeaderBig className="enormous-text"  headname={"HAPPY BIRTHDAY!!! Alpha!"}/>
        </span>
      </div>
 {/* <Suspense fallback={<div>Loading cubes...</div>}>
        <MoreCubes />
      </Suspense> */}
 {/* <Suspense fallback={<div>Loading cubes...</div>}>
        <div className='graphpaper'>
          <CubeAnimation />
        </div>
      </Suspense> */}
      <div className='text-center'>
<HeaderBig className="enormous-text" headname={"From all of us we wish you a happy birthday!"}/>
      </div>
      
   <Greetings/> 
  <div className="large-scale-screen mb-5">
<Header2  headname={"And now... The last moment of this birthday greeting"}/>
<div className="ratio ratio-16x9">
<iframe
      src={"https://player.vimeo.com/video/1084849073"}
      // title="YouTube video"
      allowfullscreen
      allow="fullscreen" 
    ></iframe></div>
    <Header2  headname={"If you wish to add a birthday greeting, please go to the site below"}/>


      <Button href="https://forms.gle/Nmxx28AjYtV8CPxj9" target="_blank" variant="outline-light">Click here to enter in a message</Button>
      </div>

    </div>
  );
}

export default EasterEggPage;