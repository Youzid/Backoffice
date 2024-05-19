import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import LocationIcon from "../../assets/main/backoffice.svg";

import { t } from 'i18next';

interface IMapComponent {
  formik: any
}
const MapComponent = ({ formik }: IMapComponent) => {
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([35.939838, 0.089767]);
  useEffect(() => {
    setMapPosition(
      formik.values.latitude && formik.values.longitude
        ? [formik.values.latitude, formik.values.longitude]
        : [36.7538, 3.0588]
    );
  }, [formik.values]);

  const customIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [50, 50],
    iconAnchor: [30, 52],
    className: "shadow-md shadow-black/30 bg-white/70 hover:bg-transparent duration-300 rounded-full"
  });
  const SelectLocationMap = () => {

    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        formik.setValues({ ...formik.values, latitude: lat, longitude: lng });
        setMapPosition([lat, lng]);
      }
    });

    return (
      <Marker position={mapPosition} icon={customIcon}  >
        <Popup>{t("location")}</Popup>
      </Marker>
    );
  };
  const RecenterAutomatically = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapPosition);
      // eslint-disable-next-line
    }, []);
    return null;
  };


  return (
    <MapContainer attributionControl={false} center={mapPosition} zoom={17} className='w-full h-[45vh] rounded-lg shadow-xl' >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SelectLocationMap />
      <RecenterAutomatically />


    </MapContainer>

  );
};

export default MapComponent;