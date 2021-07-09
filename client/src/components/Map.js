// import React, { Component } from 'react'
// import { Map as GoogleMap, Marker, GoogleApiWrapper } from 'google-maps-react'

// const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

// const mapStyles = {
//   width: '100%',
//   height: '500px',
//   position: 'relative'
// }

// let service = null

// export class Map extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       center: {
//         lat: 0,
//         lng: 0
//       }
//     }
//   }

//   onMarkerClick = (props, marker, e) => {
//     console.log(props, marker, e)
//   }

//   initPlaces(mapProps, map) {
//     const { google } = mapProps
//     service = new google.maps.places.PlacesService(map)
//   }

//   render() {
//     const { places } = this.props

//     var bounds = new this.props.google.maps.LatLngBounds()

//     // extend the bounds to include each suggestion
//     for (var i = 0; i < places.length; i++) {
//       bounds.extend(places[i].geometry.location)
//     }

//     // extend the bounds to include OUR current location
//     bounds.extend(this.props.pos)

//     return (
//       <div style={mapStyles}>
//         <GoogleMap
//           google={this.props.google}
//           onReady={this.initPlaces}
//           zoom={14}
//           bounds={bounds}
//           initialCenter={this.center}>
//           {places.map((marker, i) => (
//             <Marker
//               onClick={this.onMarkerClick}
//               name={marker.name}
//               position={marker.geometry.location}
//               key={i}
//             />
//           ))}

//           {/* DISPLAY MY POSITION IN THE MAP */}
//           <Marker name='My current location' position={this.props.pos} />
//         </GoogleMap>
//       </div>
//     )
//   }
// }

// export default GoogleApiWrapper({
//   apiKey
// })(Map)
