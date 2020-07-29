import ReactMapGL from 'react-map-gl';
import React, { useState, useEffect} from 'react';
import * as locations from "../../data/locations.json"
import LocationMarker from "./LocationMarker";
import LocationPopup from "./LocationPopup";



export default function Map(props) {
    
    const [viewport, setViewport] = useState({
        latitude: 43.161030,
        longitude: -77.610924,
        zoom: 11,
        width: '100%',
        height: '200px'
    })	
    
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect((props) => {

        const listener = e => {
            if (e.key === "Escape") {
                setSelectedLocation(null)
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);


    return ( 
        
        <ReactMapGL {...viewport} width="100%" height="inherit"
            
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            
            onResize={() => {
                const { latitude, longitude, width, height, zoom } = viewport;

                setViewport({
                    height: height,
                    width: width,
                    zoom: zoom, 
                    latitude: 	latitude,
                    longitude: longitude,
                })
            }}
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
        >
            {locations.locations.map(location => (
                <LocationMarker setSelectedLocation={setSelectedLocation} location={location} key={location.id}/>
            ))}

            {selectedLocation ? (
                <LocationPopup selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            ): null}
        </ReactMapGL>
    )
}


