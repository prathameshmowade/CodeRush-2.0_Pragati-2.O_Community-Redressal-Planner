import React, { useState, useCallback, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { MapPin, Navigation, CheckCircle2, Compass } from 'lucide-react';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '240px',
  borderRadius: '0.75rem'
};

const DEFAULT_CENTER = {
  lat: 21.1458,
  lng: 79.0882
};

export default function LocationPicker({ onSelect }) {
  const { t, isHindi } = useContext(LanguageContext);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [coords, setCoords] = useState(DEFAULT_CENTER);
  const [detecting, setDetecting] = useState(false);
  const [address, setAddress] = useState('Laxmi Nagar, Nagpur');

  const handleMapClick = useCallback((e) => {
    if (e.latLng) {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      const newCoords = { lat: newLat, lng: newLng };
      setCoords(newCoords);
      const addrStr = `Pinned: ${newLat.toFixed(4)}° N, ${newLng.toFixed(4)}° E (Laxmi Nagar)`;
      setAddress(addrStr);
      onSelect?.(addrStr);
    }
  }, [onSelect]);

  const handleMarkerDragEnd = useCallback((e) => {
    if (e.latLng) {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      const newCoords = { lat: newLat, lng: newLng };
      setCoords(newCoords);
      const addrStr = `Pinned: ${newLat.toFixed(4)}° N, ${newLng.toFixed(4)}° E`;
      setAddress(addrStr);
      onSelect?.(addrStr);
    }
  }, [onSelect]);

  const handleDetectGPS = () => {
    setDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const l = { lat: p.coords.latitude, lng: p.coords.longitude };
          setCoords(l);
          const addrStr = `GPS Detected: ${l.lat.toFixed(4)}° N, ${l.lng.toFixed(4)}° E`;
          setAddress(addrStr);
          onSelect?.(addrStr);
          setDetecting(false);
        },
        () => {
          setDetecting(false);
          const fallback = `GPS Default: 21.1458° N, 79.0882° E (Laxmi Nagar)`;
          setAddress(fallback);
          onSelect?.(fallback);
        }
      );
    } else {
      setDetecting(false);
      const fallback = `GPS Default: 21.1458° N, 79.0882° E (Laxmi Nagar)`;
      setAddress(fallback);
      onSelect?.(fallback);
    }
  };

  return (
    <div className="bg-white dark:bg-emerald-950/70 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="space-y-0.5">
          <h3 className="font-bold text-emerald-950 dark:text-white text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t('loc_title')}</span>
          </h3>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
            {t('loc_sub')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDetectGPS}
          disabled={detecting}
          className="btn-emerald text-xs py-1.5 px-3 flex items-center gap-1 shrink-0"
        >
          <Navigation className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
          <span>{detecting ? t('loc_detecting') : t('loc_auto_gps')}</span>
        </button>
      </div>

      {/* Map Surface */}
      <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 relative bg-emerald-50/50 dark:bg-emerald-900/30">
        {apiKey && isLoaded ? (
          <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={coords}
            zoom={15}
            onClick={handleMapClick}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: [
                {
                  featureType: 'all',
                  elementType: 'geometry',
                  stylers: [{ color: '#f0fdf4' }]
                }
              ]
            }}
          >
            <MarkerF
              position={coords}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          </GoogleMap>
        ) : (
          <div className="h-[240px] flex flex-col items-center justify-center p-6 text-center space-y-2">
            <Compass className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="font-bold text-emerald-950 dark:text-white text-xs">
              {isHindi ? 'नागपुर जोन 12 जीपीएस टेलीमेट्री ग्रिड' : 'Nagpur Zone 12 Spatial Telemetry Grid'}
            </span>
            <p className="text-[10px] text-emerald-800 dark:text-emerald-300 max-w-xs">
              {isHindi ? 'सटीक भौगोलिक निर्देशांक: 21.1458° N, 79.0882° E (लक्ष्मी नगर, नागपुर)' : 'Simulated GPS Pinpoint: 21.1458° N, 79.0882° E (Laxmi Nagar Ward Center)'}
            </p>
          </div>
        )}
      </div>

      {/* Selected Address Display */}
      <div className="bg-emerald-50/70 dark:bg-emerald-900/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
        <span className="text-emerald-800 dark:text-emerald-300 font-medium">
          {t('loc_current')} <strong className="text-emerald-950 dark:text-white">{address}</strong>
        </span>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{isHindi ? 'जीपीएस लॉक' : 'GPS Locked'}</span>
        </span>
      </div>
    </div>
  );
}
