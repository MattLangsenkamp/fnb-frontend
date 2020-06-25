import { Popup } from 'react-map-gl';
import React from 'react';

export default function LocationPopup({selectedLocation, setSelectedLocation}) {
    return (    
        <Popup 
            latitude={selectedLocation.coordinateY} 
            longitude={selectedLocation.coordinateX}
            onClose={() => setSelectedLocation(null)}
        >
            <div>
                <h1>
                    {selectedLocation.friendlyLocation}
                </h1>
                park
            </div>  
        </Popup>
    )
}