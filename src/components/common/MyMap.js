import ReactMapGL, { Marker, Popup  } from 'react-map-gl';
import React, { useState, useEffect} from 'react';
import * as locations from "../../data/locations.json"
import LocationMarker from "./LocationMarker";
import LocationPopup from "./LocationPopup";


export default function Map(props) {
    const {
        width = '100%',
        height = '200px',
        zoom = 11,
        location = [43.161030, -77.610924] // lat/long respectively
    } = props

    const [viewport, setViewport] = useState({
        latitude: location[0],
        longitude: location[1],
        zoom,
        width: width,
        height: height
    })	
    

    const [selectedLocation, setSelectedLocation] = useState(null);
    

    useEffect(() => {
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
        <ReactMapGL {...viewport} 
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
                <LocationMarker setSelectedLocation={setSelectedLocation} location={location}/>
            ))}

            {selectedLocation ? (
                <LocationPopup selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            ): null}
        </ReactMapGL>
    )
}