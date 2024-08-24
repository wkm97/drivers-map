'use client'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import { ControlPanel } from '@/components/control-panel';

const initialCoordinates = [37.394, 127.110]
interface Driver {
  driver_id: string
  location: {
    latitude: number
    longitude: number
    bearing: number
  }
}

interface Drivers {
  pickup_eta: number
  drivers: Driver[]
}

export default function Home() {

  const [drivers, setDrivers] = useState<Driver[]>([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    const fetchDriver = async () => {
      const params = new URLSearchParams({
        latitude: initialCoordinates[0].toString(),
        longitude: initialCoordinates[1].toString(),
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
          latitude: initialCoordinates[0],
          longitude: initialCoordinates[1],
          zoom: 15
        }}
        dragRotate={false}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        // mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Marker latitude={initialCoordinates[0]} longitude={initialCoordinates[1]} color="red" />
        {drivers.map(({ location, driver_id }) => <Marker key={driver_id} latitude={location.latitude} longitude={location.longitude} color="green" />)}
      </Map>
      <ControlPanel onCountChange={(count)=> setCount(Number(count))}/>
    </div>
  );
}
