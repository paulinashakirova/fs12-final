import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const mapStyles = {
  width: '100%',
  height: '500px',
  position: 'relative'
}

let service = null

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      suggestions: [],
      places: [],
      infoWindow: new InfoWindow(),
      center: {
        lat: 40.4222222,
        lng: -3.7185121
      },
      pos: {}
    }
  }

  savePlace = (place) => {
    this.setState({ places: [...this.state.places, place] })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search()
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e)
  }

  initPlaces(mapProps, map) {
    const { google } = mapProps
    service = new google.maps.places.PlacesService(map)
  }

  search = () => {
    const { input } = this.state
    service.textSearch({ query: input }, (suggestions) => {
      this.setState({
        suggestions
      })
    })
  }

  render() {
    const { suggestions, places } = this.state

    var bounds = new this.props.google.maps.LatLngBounds()
    for (var i = 0; i < places.length; i++) {
      bounds.extend(places[i].geometry.location)
    }

    const getLocation = () => {
      const { infoWindow } = this.state
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            console.log(position)
            this.setState({
              // infoWindow,
              pos
            })
          },
          () => {
            handleLocationError(true, infoWindow)
          }
        )
      } else {
        handleLocationError(false, infoWindow)
      }
    }

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos)
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : "Error: Your browser doesn't support geolocation."
      )
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='form-inline d-flex justify-content-between mb-4'>
              <input
                type='text'
                value={this.state.input}
                onChange={this.handleChange}
                className='form-control flex-grow-1'
                placeholder='Search for places on Google Maps'
                onKeyPress={this.handleKeyPress}
              />
              <button onClick={this.search} className='btn btn-primary ml-2'>
                Search
              </button>
              <button onClick={getLocation} className='btn btn-info'>
                Find me
              </button>
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

                  <button className='btn btn-outline-primary' onClick={() => this.savePlace(place)}>
                    Show
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div style={mapStyles}>
            <Map
              google={this.props.google}
              onReady={this.initPlaces}
              zoom={14}
              bounds={bounds}
              initialCenter={this.center}>
              {places.map((marker, i) => (
                <Marker
                  onClick={this.onMarkerClick}
                  name={marker.name}
                  position={marker.geometry.location}
                  key={i}
                />
              ))}
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey
})(MapContainer)
