import React, { useState } from 'react';
import NewSegments from './Components/NewSegments';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div>Navbar</div>
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Save Segment
        </button>
        <NewSegments isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}

export default App;
