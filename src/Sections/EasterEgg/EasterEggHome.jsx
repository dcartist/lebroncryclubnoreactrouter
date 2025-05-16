import React, { Suspense, lazy } from 'react';
import {Greetings} from '../Greetings/greetings';
// import CubeAnimation from '../CubeAnimation/CubeAnimation';
// import MoreCubes from '../CubeAnimation/MoreCubes';
const CubeAnimation = lazy(() => import('../CubeAnimation/CubeAnimation'));
const MoreCubes = lazy(() => import('../CubeAnimation/MoreCubes'));

 const EasterEggPage = () => {
  return (

    <div>
 <Suspense fallback={<div>Loading cubes...</div>}>
        <MoreCubes />
      </Suspense>
 <Suspense fallback={<div>Loading cubes...</div>}>
        <div className='graphpaper'>
          <CubeAnimation />
        </div>
      </Suspense>
   <Greetings/> 
      <h1>Lebron Cry Club</h1>
      <p>Welcome to the Lebron Cry Club! Here, we celebrate the moments that make us cry, laugh, and everything in between. Join us in our journey through the ups and downs of life!</p>
      <p>We are a community of fans who appreciate the beauty of vulnerability and the power of emotions. Whether you're a die-hard fan or just someone who enjoys a good cry, you're welcome here!</p>
    </div>
  );
}

export default EasterEggPage;