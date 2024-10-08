
import type { LayerProps } from 'react-map-gl';
import colors from "tailwindcss/colors";

import { Driver } from '@/types/driver';

export const parsePathData = (driver: Driver) => {
  return {
    type: 'FeatureCollection',
    features: driver.routes.map(({ geometry }) => ({
      type: 'Feature',
      geometry,
      properties: {}
    }))
  }
}

export const pathLayer: LayerProps = {
  id: 'path',
  type: 'line',
  source: 'LineString',
  layout: {
    'line-cap': 'round'
  },
  paint: {
    'line-width': 4,
    'line-gradient': [
      "interpolate",
      ["linear"],
      ["line-progress"],
      0,
      colors['green']['400'],
      1,
      colors['green']['700']
    ],
  }
};
