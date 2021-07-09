import React, { useState } from 'react'
import axios from 'axios'

export default function ShareMyLocation(props) {
  const [sharingStatus, setSharingStatus] = useState(null)
  //sends location to BE
  const sendMyCurrentLocation = async () => {
    await props.getLocation()
    axios.put('/users/location', props.position)
    console.warn(props.position)
  }
  //sets interval to send location every 10 secs
  const shareMyLocation = () => {
    setSharingStatus(setInterval(sendMyCurrentLocation, 10000))
    console.warn('sharingStatus', sharingStatus)
  }
  // stops sharing the location
  const stopSharingMyLocation = () => {
    clearInterval(sharingStatus)
    setSharingStatus(false)
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
