import React, { useState, useEffect } from 'react'
import Map from './Map'
import ShareMyLocation from './ShareMyLocation'

export default function DashboardMap() {
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [status, setStatus] = useState(null)
  useEffect(() => {
    getLocation()
  }, [])

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

  return (
    <div className='container'>
      <div className='row'>
        <button onClick={getLocation} className='btn btn-info mb-2'>
          Find me
        </button>
        <ShareMyLocation position={position} getLocation={getLocation} />
        <Map position={position}></Map>
      </div>
    </div>
  )
}
// /1. Browser should ask the user for their current location using navigation.geolocation
// 2.  Send this info to the backend and store ir in the users table
// 3. Generate link to share with others (/livelocation/5) where 5 is user ID
// 4. When a person opens that link a component is gonna show in the frontend which is gonna make
//  a request to the backend to the LAT and LNG for the user(GET/users/5/location)
// 5. (This is gonna return LAT AND LNG)
// 6. Show as a marker in the map
