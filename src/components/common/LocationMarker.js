import { Marker} from 'react-map-gl';
import React from 'react';


export default function MyMap({setSelectedLocation, location}) {
    return (
        <Marker 
            key={location.id} 
            latitude={location.coordinateY} 
            longitude={location.coordinateX}
        >
            <button className="marker-btn" 
                onClick={e => {
                    e.preventDefault();
                    setSelectedLocation(location);
                }}
            >
                <img src="/work.png" alt="location" />
            </button>
        </Marker>
    )
}