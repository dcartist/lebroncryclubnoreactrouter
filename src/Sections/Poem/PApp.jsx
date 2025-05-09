import React from 'react';
import ThreeExperience from './poembasketball';

function PApp() {
  return (
    <>
      <div id="content" className="content">
        <p>
          Blackbird singing in the dead of <span>night</span><br />
          Take these broken <span>wings</span> and learn to fly<br />
          All your life<br />
          You were only <span>waiting</span> for this moment to arise<br />
          {/* ...more lines here if you want */}
        </p>
      </div>

      <ThreeExperience />
    </>
  );
}

export default PApp;