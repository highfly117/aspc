import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJiDxL5x2vUHgH77_f6WOyAIVRacWUWFI"; // Replace with your actual API key
const MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

const GoogleMapProperties = ({ locations }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Dynamically load the Google Maps script
  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = MAP_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => initializeMap();
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!window.google || !window.google.maps || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 57.14589702347154, lng: -2.113011357843587 },
      zoom: 4,
    });
    setMap(map);
  };

  useEffect(() => {
    // This effect should only run once to ensure the map is initialized only once
    if (!window.google || !window.google.maps) {
      loadGoogleMapsScript();
    }
  }, []);

  useEffect(() => {
    // This effect should only run once to ensure the map is initialized only once
    if (!window.google || !window.google.maps) {
      loadGoogleMapsScript();
    }
  }, []);
  
  useEffect(() => {
    // Initialize map only if it hasn't been initialized yet
    if (!map && window.google && window.google.maps && mapRef.current) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 57.14589702347154, lng: -2.113011357843587 },
        zoom: 4,
      });
      setMap(initialMap);
    }
  }, [map]);
  
  useEffect(() => {
    // This effect handles updating markers when locations change
    if (map && locations && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
  
      // Create or update markers
      const newMarkers = locations.map(location => {
        const position = new window.google.maps.LatLng(location.position.Latitude, location.position.Longitude);
        const marker = new window.google.maps.Marker({
          position,
          map,
        });
        bounds.extend(position);
        return marker;
      });
  
      // Remove previous markers from the map
      markers.forEach(marker => marker.setMap(null));
  
      // Fit map to marker bounds if more than one location
      if (locations.length > 1) {
        map.fitBounds(bounds);
      } else {
        map.setCenter(bounds.getCenter()); // or use positions of the single location
        map.setZoom(15); // Adjust zoom level for single marker
      }
  
      setMarkers(newMarkers);
    }
  }, [map, locations]); // Rerun when map or locations change

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default GoogleMapProperties;
