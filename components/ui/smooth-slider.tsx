'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Label } from "@/components/ui/label"
import { debounce } from 'lodash'

interface SliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function SmoothSlider({ min, max, step = 100, value, onChange }: SliderProps) {
  const [localValue, setLocalValue] = useState(value)
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = useCallback(debounce(onChange, 50), [onChange])

  const updateValue = useCallback((clientX: number) => {
    if (!sliderRef.current || !isDragging) return

    const rect = sliderRef.current.getBoundingClientRect()
    const position = (clientX - rect.left) / rect.width
    let newValue = Math.round((position * (max - min) + min) / step) * step
    newValue = Math.max(min, Math.min(max, newValue))

    setLocalValue(prev => {
      const newValues: [number, number] = isDragging === 'min'
        ? [Math.min(newValue, prev[1] - step), prev[1]]
        : [prev[0], Math.max(newValue, prev[0] + step)]
      handleChange(newValues)
      return newValues
    })
  }, [isDragging, max, min, step, handleChange])

  const handleStart = useCallback((event: React.MouseEvent | React.TouchEvent, type: 'min' | 'max') => {
    event.preventDefault()
    setIsDragging(type)
  }, [])

  const handleMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    updateValue(clientX)
  }, [updateValue])

  const handleEnd = useCallback(() => {
    setIsDragging(null)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove as any)
      document.addEventListener('touchmove', handleMove as any)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchend', handleEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMove as any)
      document.removeEventListener('touchmove', handleMove as any)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  const getLeftPosition = (value: number) => ((value - min) / (max - min)) * 100

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newValue = localValue[index]
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(index === 0 ? min : localValue[0] + step, newValue - step)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(index === 1 ? max : localValue[1] - step, newValue + step)
        break
      default:
        return
    }
    const newValues: [number, number] = index === 0 ? [newValue, localValue[1]] : [localValue[0], newValue]
    setLocalValue(newValues)
    handleChange(newValues)
  }

  return (
    <div className="w-full px-2 py-4">
      <div className="relative w-full h-2" ref={sliderRef}>
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${getLeftPosition(localValue[0])}%`,
            right: `${100 - getLeftPosition(localValue[1])}%`
          }}
        />
        {['min', 'max'].map((type, index) => (
          <div
            key={type}
            className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/4 touch-none"
            style={{ left: `${getLeftPosition(localValue[index])}%` }}
            onMouseDown={(e) => handleStart(e, type as 'min' | 'max')}
            onTouchStart={(e) => handleStart(e, type as 'min' | 'max')}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={localValue[index]}
            tabIndex={0}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <Label className="text-sm text-gray-600">₹{localValue[0]}</Label>
        <Label className="text-sm text-gray-600">₹{localValue[1]}</Label>
      </div>
    </div>
  )
}