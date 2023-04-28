import React, { useState } from 'react';
import { storage } from './firebase';

function GetPlot() {
  const [plots, setPlots] = useState([]);

  async function fetchPlots() {
    const storageRef = storage.ref('vis');
    try {
      const fileRefs = await storageRef.listAll();
      const urls = await Promise.all(
        fileRefs.items.map((itemRef) => itemRef.getDownloadURL())
      );
      setPlots(urls);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <button onClick={fetchPlots}>Get Plots</button>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
      {plots.map((url) => (
        <img
          key={url}
          src={url}
          alt="plot"
          style={{ width: '300px', height: '200px', margin: '10px' }}
        />
      ))}
    </div>
  </div>
  );
}

export default GetPlot;
