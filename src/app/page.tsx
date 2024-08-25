'use client'

import { useEffect, useState } from 'react';
import Map, { Layer, Marker, Popup, Source } from 'react-map-gl';
import colors from "tailwindcss/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ControlPanel } from '@/components/control-panel';
import { parsePathData, pathLayer } from '@/mapbox/layers';
import { Driver, Drivers } from '@/types/driver';

const initialCoordinates = [127.110, 37.394]

export default function Home() {

  const [drivers, setDrivers] = useState<Driver[]>([])
  const [count, setCount] = useState(1)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      const params = new URLSearchParams({
        longitude: initialCoordinates[0].toString(),
        latitude: initialCoordinates[1].toString(),
        count: count.toString()
      });
      const response = await fetch(`/api/drivers?${params}`)
      return await response.json() as Drivers
    }

    fetchDriver().then(data => setDrivers(data.drivers))
  }, [count])


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: initialCoordinates[0],
          latitude: initialCoordinates[1],
          zoom: 15
        }}
        dragRotate={false}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={initialCoordinates[0]} latitude={initialCoordinates[1]} color={colors['green']['700']} />
        {drivers.map((driver) =>
          <Marker
            key={driver.driver_id}
            latitude={driver.location.latitude}
            longitude={driver.location.longitude}
            color={colors['sky']['600']}
            onClick={async (event) => {
              event.originalEvent.stopPropagation()
              const params = new URLSearchParams({
                coordinates: `${driver.location.longitude},${driver.location.latitude};${initialCoordinates[0]},${initialCoordinates[1]}`
              });
              const response = await fetch(`/api/directions?${params}`)
              const directions = await response.json()
              setSelectedDriver({
                ...driver,
                routes: directions.routes
              })
            }}
          >
            <FontAwesomeIcon icon={faCarSide} size='2xl' color={colors['sky']['700']} />
          </Marker>)
        }
        {selectedDriver && (
          <>
            <Popup
              className='popup'
              anchor="bottom"
              longitude={Number(selectedDriver.location.longitude)}
              latitude={Number(selectedDriver.location.latitude)}
              onClose={() => setSelectedDriver(null)}
            >
              <div>
                <p>Driver: {selectedDriver.driver_id}</p>
                <p>Duration: {(selectedDriver.routes[0].duration / 60).toFixed(2)} minute(s)</p>
              </div>
            </Popup>
            <Source type="geojson" lineMetrics={true} data={parsePathData(selectedDriver)}>
              <Layer {...pathLayer} />
            </Source>
          </>
        )}
      </Map>
      <ControlPanel onCountChange={(count) => {
        setCount(Number(count))
        setSelectedDriver(null)
      }} />
    </div>
  );
}
