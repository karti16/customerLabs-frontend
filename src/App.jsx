import React, { useState } from 'react';
import NewSegments from './Components/NewSegments';

const otherContentStyles = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px',
};

const buttonStyles = {
  position: 'relative',
  zIndex: 1,
};
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>Navbar</div>
      <div
        style={buttonStyles}
        onClick={() => console.log('clicked')}
        aria-hidden="true"
      >
        <button type="button" onClick={() => setIsOpen(true)}>
          Save Segment
        </button>
        <NewSegments isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div style={otherContentStyles}>Other Contents</div>
    </>
  );
}

export default App;
