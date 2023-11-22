"use client"

import "@/app/page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { ipVersion, isIP } from "is-ip";

import axios from "axios";
import { useEffect, useState } from "react";

import {checkIP} from "@/functions/functions.js"
import MarkerPos from "@/components/marker";



export default function Home() {

  const [position, setPosition] = useState([51.5, -0.09]);
  const [search, setSearch] = useState("");
  const [IP, setIP] = useState("");
  const [searching, setSearching] = useState(true);
  const [data, setData] = useState({
    ip: "",
    location: {
      counrty: "",
      region: "",
      city: "",
    },
    timeZone: "",
    ISP: ""
  });

  const SetIp = () => {
    if( checkIP(search, ipVersion, isIP) ) {
      setIP(search);
      setSearching(true);
    }
  }

  if (data.ip === "") {
    axios.get("https://api.ipify.org/?format=json").then(
      res => setIP(res.data.ip)
    )
  }

  useEffect(() => {

    axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${IP}`).then(
      res => {
        if (res.data.location.timezone === "") {
          alert("No IP found")
        } else {
          setData({
            ip: res.data.ip,
            location: {
              counrty: res.data.location.country,
              region: res.data.location.region,
              city: res.data.location.city,
            },
            timeZone: res.data.location.timezone,
            ISP: res.data.isp,
          });
          setPosition([res.data.location.lat, res.data.location.lng]);
        }
      }
    )

  }, [IP]);

  useEffect(() => {

    setSearching(false);

  }, [data])

  useEffect(() => {

    if (searching && data.timeZone !=="") {
      setSearching(false)
    }

  }, [searching]);


  return (


    <div className="container-fluid">
      <div className="row">
        {/* form sec start */}

          <div className="col-12 formSec">
            <div className="background">
              <h3>IP Address Tracker</h3>
              <div className="form">
                <form action="">
                  <input type="text" placeholder="Search for any IP address or domain" onChange={(e) => {setSearch(e.target.value)}} />
                  <button type="button" onClick={SetIp}><img src="./images/icon-arrow.svg" alt=">"/></button>
                </form>
              </div>
              <div className="row info">

                <div className="col-md-3 col-12 row frst">
                  <div className="col-12">
                    <span className="header">IP ADDRESS</span>
                  </div>
                  <div className="col-12">
                    <span className="info">
                      {
                        searching ? 
                        <span className="loading"></span>
                        :
                        data.ip
                      }
                    </span>
                  </div>
                </div>

                <div className="col-md-3 col-12 row">
                  <div className="col-12">
                    <span className="header">LOCATION</span>
                  </div>
                  <div className="col-12">
                    <span className="info">
                      {
                        searching ?
                        <span className="loading"></span>
                        :
                        <>
                          {data.location.counrty && data.location.counrty + ", "}
                          {data.location.region && data.location.region + ", "}
                          {data.location.city}
                        </>
                      }
                    </span>
                  </div>
                </div>

                <div className="col-md-3 col-12 row">
                  <div className="col-12">
                    <span className="header">TIMEZONE</span>
                  </div>
                  <div className="col-12">
                    <span className="info">
                      {
                        searching ?
                        <span className="loading"></span>
                        :
                        data.timeZone
                      }
                    </span>
                  </div>
                </div>

                <div className="col-md-3 col-12 row">
                  <div className="col-12">
                    <span className="header">ISP</span>
                  </div>
                  <div className="col-12">
                    <span className="info">
                      {
                        searching ?
                        <span className="loading"></span>
                        :
                        data.ISP
                      }
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        {/* form sec end */}

        {/* map sec start */}

          {/* <div className="col-12 mapSec">

            <MapContainer
              center={position}
              zoom={14}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerPos pos={position} ></MarkerPos>
            </MapContainer>

          </div> */}

        {/* map sec end */}
      </div>
    </div>
  )
}
