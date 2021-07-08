import React, { useState } from 'react'
import axios from 'axios'

export default function ShareMyLocation(props) {
  let interval
  const [sharingStatus, setSharingStatus] = useState(false)
  //sends location to BE
  const sendMyCurrentLocation = async () => {
    await props.getLocation()
    axios.put('/users/location', props.position)
    console.warn(props.position)
  }
  //sets interval to send location every 10 secs
  const shareMyLocation = () => {
    setSharingStatus(true)
    console.warn('sharingStatus', sharingStatus)
    interval = setInterval(sendMyCurrentLocation, 10000)
  }
  // stops sharing the location
  const stopSharingMyLocation = async () => {
    setSharingStatus(false)
    await clearInterval(interval)
    console.log('thisworks')
  }

  return (
    <div className='row g-0 gap-1 mb-3'>
      <button className='btn btn-success' onClick={sendMyCurrentLocation} disabled={!props.position}>
        Share my current location
      </button>
      <button className='btn btn-info' hidden={sharingStatus} onClick={shareMyLocation}>
        Share my location
      </button>
      <button className='btn btn-warning' hidden={!sharingStatus} onClick={stopSharingMyLocation}>
        Stop sharing my location
      </button>
    </div>
  )
}
// GET users location from backend and display in map
// Fetch every ten seconds to get the updated position
// setInterval
// From the users sharing location, PUT my location to the backend so its updated
//  PUT /location
