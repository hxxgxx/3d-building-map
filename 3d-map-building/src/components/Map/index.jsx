import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWd1c3Rpbi1jYXN0aWFyZW5hIiwiYSI6ImNrYXF6bXYwMTBhNDIycmxybmdzZXNzNHkifQ.SyGhFPyWVuNIkUluQCd0cw";

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Map = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  const onLoadMap = useCallback(() => {
    if (!map) return;
    const { layers } = map.getStyle();
    const layer = layers.find((layer) => {
      return layer.type === "symbol" && layer.layout["text-field"];
    });
    map.addLayer(
      {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 10,
        paint: {
          "fill-extrusion-color": "#aaa",

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            10.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            10.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      },
      layer.id
    );

    //map.getCanvas().focus();
  }, [map]);

  useEffect(() => {
    if (!map) {
      setMap(
        new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/light-v10",
          center: [126.9957, 37.5237],
          zoom: 13,
          pitch: 70,
          bearing: -17,
          antialias: true,
        })
      );
    }

    if (map) {
      map.on("load", onLoadMap);
    }
  }, [map, setMap, onLoadMap]);
};

export default Map;
