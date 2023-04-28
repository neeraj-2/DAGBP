import React, { useState } from 'react';

function GetPlot() {
    const [plot, setPlot] = useState(null);

    async function fetchPlot() {
        try {
            const response = await fetch('http://localhost:5000/get_plots', {
                mode: 'cors'
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPlot(url);
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div>
            <button onClick={fetchPlot}>Get Plot</button>
            {plot && <img src={plot} alt="plot" />}
        </div>
    );
}

export default GetPlot;
