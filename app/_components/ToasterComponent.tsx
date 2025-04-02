import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToasterComponent() {
  return (
    <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#888',
                  color: '#fff',
                  padding: "1rem 3rem",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                },
                success: {
                  duration: 2000,
                  style: {
                    background: '#5a5',
                    border: '2px solid green',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#a55',
                    border: '2px solid darkred',
                  },
                },
                custom: {
                  duration: 36000,
                }
              }}
            />
  )
}
