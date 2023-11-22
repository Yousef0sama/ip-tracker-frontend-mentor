"use client"

import {useMap, Marker, Popup} from 'react-leaflet'

import { useEffect } from 'react'

export default function MarkerPos(pos) {

  const map = useMap()

  useEffect(() => {

    map.flyTo(pos.pos, 14, { animate: true })

  }, [map, pos.pos])


  return(
    <>
      <Marker
      position={pos.pos}
      icon={
        L.icon({iconSize: [32, 40],
        iconAnchor: [10, 41],
        popupAnchor:[2, -40],
        iconUrl: "./images/icon-location.svg"})
      }
      >
      </Marker>
    </>
  )
}