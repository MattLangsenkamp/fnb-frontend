import { Marker} from 'react-map-gl';
import React from 'react';
import tomato from '../../data/tomato.jpg'


export default function MyMap({setSelectedLocation, location}) {
    return (
        <Marker 
            key={location.id} 
            latitude={location.latitude} 
            longitude={location.longitude}
        >
            <button className="marker-btn" 
                onClick={e => {
                    e.preventDefault();
                    setSelectedLocation(location);
                }}
            >
                <img src={tomato} alt="location" />
            </button>
        </Marker>
    )
}