'use client'

import * as React from 'react';

export const ControlPanel = ({children}: React.PropsWithChildren) => {
  return (
    <div className="absolute bottom-20 left-0 right-0 ml-auto mr-auto sm:w-1/2 text-sky-900">
      <div className='bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 h-full w-full bg-sky-500 rounded-md border border-gray-100'>
        {children}
      </div>
    </div>
  );
}