"use client";
import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

export default function MapaInteractivo({ onCountryClick }) {
  const [data, setData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    fetch('/data/mapa_matriculacion.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error cargando el JSON del mapa:", err));
  }, []);

  // Escala de colores institucional (Teal/Emerald)
  const colorScale = scaleLinear()
    .domain([10, 30, 50])
    .range(["#f0fdfa", "#14b8a6", "#0f766e"]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-stone-50 w-full h-full relative shadow-sm">
      <div className="mb-8">
        <div className="h-1 w-12 bg-[#14b8a6] rounded-full mb-4"></div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Geografía del Filtro Invisible</h2>
        <p className="text-slate-500 font-medium text-lg">Distribución de Matriculación Femenina en STEM (LatAm)</p>
        <p className="text-xs text-slate-400 mt-2 italic font-semibold uppercase tracking-tighter">
          * Haz clic en un país para filtrar el ranking detallado.
        </p>
      </div>

      {tooltipContent && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl shadow-2xl z-10 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
          <span dangerouslySetInnerHTML={{ __html: tooltipContent }} />
        </div>
      )}

      <div className="h-[500px] border border-stone-100 rounded-[2rem] overflow-hidden bg-stone-50/50 shadow-inner">
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 350, center: [-60, -15] }}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = data.find(d => d.Mapa_Name === geo.properties.name);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={country ? colorScale(country.Matricula_Mujeres) : "#f1f5f9"}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      onClick={() => {
                        if (country && onCountryClick) {
                          onCountryClick(country.Pais); // Activa el filtro en la tabla
                        }
                      }}
                      onMouseEnter={() => {
                        if (country) {
                          setTooltipContent(`<b>${country.Pais} (${country.Anio}):</b> ${country.Matricula_Mujeres}%`);
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: { outline: "none" },
                        hover: { 
                          fill: "#ca8a04", // Ámbar al pasar el mouse
                          outline: "none", 
                          cursor: country ? "pointer" : "default", 
                          transition: "all 300ms" 
                        },
                        pressed: { outline: "none", fill: "#a16207" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      {/* Barra de leyenda */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>Baja Participación</span>
        <div className="h-2 w-64 bg-gradient-to-r from-[#f0fdfa] via-[#14b8a6] to-[#0f766e] rounded-full shadow-sm border border-stone-100"></div>
        <span>Alta Participación</span>
      </div>
    </div>
  );
}