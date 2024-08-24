'use client'

import * as React from 'react';
import { useState } from 'react';

export const Slider = ({ id, min, max, onChange, ...others }: React.ComponentProps<"input">) => {
  const [value, setValue] = useState(min)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
    onChange ? onChange(e) : undefined
  }

  return (
    <div className='w-full flex items-center justify-center gap-2'>
      <input
        type="range"
        className="
          w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
          [&::-webkit-slider-thumb]:w-2.5
          [&::-webkit-slider-thumb]:h-2.5
          [&::-webkit-slider-thumb]:-mt-0.5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:ease-in-out
        [&::-webkit-slider-thumb]:bg-sky-100
          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(2,132,199,1)]

          [&::-webkit-slider-runnable-track]:w-full
          [&::-webkit-slider-runnable-track]:h-2
          [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:bg-sky-100
        
          [&::-moz-range-thumb]:w-2.5
          [&::-moz-range-thumb]:h-2.5
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:duration-150
          [&::-moz-range-thumb]:ease-in-out
        [&::-moz-range-thumb]:bg-sky-100
        [&::-moz-range-thumb]:border-sky-600
        
          [&::-moz-range-track]:w-full
          [&::-moz-range-track]:h-2
          [&::-moz-range-track]:rounded-full
        [&::-moz-range-track]:bg-sky-100
        "
        min={min}
        max={max}
        {...others}
        value={value}
        onChange={handleChange}
      />
      <span className='w-8 text-center'>{value}</span>
    </div>
  );
}