"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import Modal from "./Modal";
import Tooltip from "./Tooltip";

export default function Map({
  zoom = 1,
  searchTerm,
}: {
  zoom?: number;
  searchTerm: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const [tooltip, setTooltip] = useState({
    content: "",
    visible: false,
    x: 0,
    y: 0,
  });

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projectionConfig={{ scale: 147 }}
        className="w-full h-full"
      >
        <ZoomableGroup center={[0, 0]} zoom={zoom}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted =
                  searchTerm &&
                  geo.properties.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#FFFFFF"
                    style={{
                      default: {
                        fill: isHighlighted ? "#FFCC00" : "#000000",
                        outline: "none",
                      },
                      hover: {
                        fill: "#FFFFFF",
                        outline: "none",
                        cursor: "pointer",
                        stroke: "#000000",
                      },
                      pressed: {
                        fill: "#FFFFFF",
                        outline: "none",
                      },
                    }}
                    onMouseEnter={(evt) => {
                      const { clientX, clientY } = evt;
                      setTooltip({
                        content: geo.properties.name,
                        visible: true,
                        x: clientX,
                        y: clientY,
                      });
                    }}
                    onMouseLeave={() => {
                      setTooltip((prev) => ({
                        ...prev,
                        visible: false,
                      }));
                    }}
                    onMouseMove={(evt) => {
                      const { clientX, clientY } = evt;
                      setTooltip((prev) => ({
                        ...prev,
                        x: clientX,
                        y: clientY,
                      }));
                    }}
                    onClick={() => {
                      setSelectedCountry({
                        name: geo.properties.name,
                        id: geo.id as string,
                      });
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Modal
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
        country={selectedCountry}
      />
      <Tooltip {...tooltip} />
    </div>
  );
}
