'use client'

import * as React from 'react';
import { Slider } from './slider';

interface ControlPanelProps {
  onCountChange: (num: number | string) => void
}

export const ControlPanel = ({onCountChange}: ControlPanelProps) => {
  return (
    <div className="absolute bottom-20 left-0 right-0 ml-auto mr-auto sm:w-1/2 text-sky-900">
      <div className='bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 h-full w-full bg-sky-500 rounded-md border border-gray-100'>
        <form>
          <div className='p-4 flex flex-row items-center justify-center gap-4'>
            <label htmlFor="driver-count" className="block w-fit whitespace-nowrap text-sm font-medium text-sky">Count</label>
            <Slider min={1} max={50} onChange={(e)=> onCountChange(e.target.value)}/>
            {/* <input id="driver-count" type="range" className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer dark:bg-sky-700" /> */}
          </div>
        </form>
      </div>
    </div>
  );
}