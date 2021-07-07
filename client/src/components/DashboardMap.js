import React, { useState, useEffect } from 'react'
import Map from './Map'
import axios from 'axios'

export default function DashboardMap() {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [places, setPlaces] = useState([])
  const [pos, setPos] = useState({
    lat: 0,
    lng: 0
  })
  const [status, setStatus] = useState(null)
  useEffect(() => {
    getLocation()
  })

  const savePlace = (place) => {
    // setState({ places: [...state.places, place] })
  }

  const handleChange = (e) => {
    // setState({ input: e.target.value })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // search()
    }
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          // setPos({ lat: position.coords.latitude, lng: position.coords.longitude })
        },
        () => {
          setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='form-inline d-flex justify-content-between mb-4'>
              <input
                type='text'
                value={input}
                onChange={handleChange}
                className='form-control flex-grow-1'
                placeholder='Search for places on Google Maps'
                onKeyPress={handleKeyPress}
              />
              {/* <button onClick={search} className='btn btn-primary ml-2'>
                Search
              </button> */}
            </div>
            <h3>Suggestions</h3>
            <ul className='list-group'>
              {suggestions.map((place, i) => (
                <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <div>
                      <strong>{place.name}</strong>
                    </div>
                    <span className='text-muted'>{place.formatted_address}</span>
                  </div>

                  <button className='btn btn-outline-primary' onClick={() => savePlace(place)}>
                    Show
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={getLocation} className='btn btn-info m-5'>
            Find me
          </button>
          <Map position={pos} places={places}></Map>
        </div>
      </div>
    </div>
  )
}
