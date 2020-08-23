import { Popup } from 'react-map-gl';
import React from 'react';

export default function LocationPopup({selectedLocation, setSelectedLocation}) {
    return (    
        <Popup 
            latitude={selectedLocation.latitude} 
            longitude={selectedLocation.longitude}
            onClose={() => setSelectedLocation(null)}
        >
            <div>
                <h4> {selectedLocation.name} </h4>
                <h6>
                    {selectedLocation.friendlyLocation}
                </h6>
                <h6>
                    {selectedLocation.description}
                </h6>
                <img src={selectedLocation.pictureURI} alt="location" />
            </div>  
        </Popup>
    )
}