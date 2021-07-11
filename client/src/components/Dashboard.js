import React, { useState, useEffect } from 'react'
import Map from './Map'
import axios from 'axios'

export default function Dashboard() {
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [status, setStatus] = useState(null)
  const [sharingStatus, setSharingStatus] = useState(false)

  useEffect(() => {
    setInterval(getLocation, 10000)
  }, [])
  useEffect(() => {
    if (sharingStatus) updateMyLocation()
  }, [position])

  //ask the user for their current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        },
        () => {
          setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  const sendMyCurrentLocation = () => {
    try {
      axios.post(
        '/liveLocation',
        { latitud: position.lat, longitude: position.lng },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const updateMyLocation = () => {
    axios.put('/users/liveLocation', position)
  }

  const shareMyLocation = () => {
    setSharingStatus(true)
  }

  const stopSharingMyLocation = () => {
    setSharingStatus(false)
  }

  return (
    <div className='container'>
      <div className='row'>
        {status}
        <div className='row g-0 gap-1 mb-3'>
          <button className='btn btn-success' onClick={sendMyCurrentLocation} disabled={!position}>
            Share my current location
          </button>
          <button className='btn btn-info' hidden={sharingStatus} onClick={shareMyLocation}>
            Share my location
          </button>
          <button className='btn btn-warning' hidden={!sharingStatus} onClick={stopSharingMyLocation}>
            Stop sharing my location
          </button>
        </div>
        <Map position={position}></Map>
      </div>
    </div>
  )
}
