import React, { Suspense, lazy } from 'react';
import {Greetings} from '../Greetings/greetings';
// import CubeAnimation from '../CubeAnimation/CubeAnimation';
// import MoreCubes from '../CubeAnimation/MoreCubes';
// const CubeAnimation = lazy(() => import('../CubeAnimation/CubeAnimation'));
import { HeaderBig } from '../../Components/Headers/Headers';
const MoreCubes = lazy(() => import('../CubeAnimation/MoreCubes'));

 const EasterEggPage = () => {
  return (

    <div>
      <div className='donuts'>
        <HeaderBig className="enormous-text" headname={"HAPPY BIRTHDAY!!"}/>
      </div>
 <Suspense fallback={<div>Loading cubes...</div>}>
        <MoreCubes />
      </Suspense>
 {/* <Suspense fallback={<div>Loading cubes...</div>}>
        <div className='graphpaper'>
          <CubeAnimation />
        </div>
      </Suspense> */}
      <div className='text-center'>
<HeaderBig className="enormous-text" headname={"From All of us... happy Birthday!!"}/>
      </div>
      
   <Greetings/> 

    </div>
  );
}

export default EasterEggPage;