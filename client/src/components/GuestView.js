import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Map from './Map'
import axios from 'axios'

export default function GuestView() {
  let { id } = useParams()

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })

  useEffect(() => {
    getPosition()
  }, [id])

  const getPosition = async () => {
    try {
      const { data } = await axios.get(`/api/location/liveLocation/${id}`)
      setPosition(data)
    } catch (error) {
      console.warn(error)
    }
  }
  return <div>{position ? <Map position={position} guestMode={true} /> : null}</div>
}
