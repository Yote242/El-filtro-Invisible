"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartEgresoMujeres() {
  const [data, setData] = useState([]);
  // Corregido: Iniciamos con string vacío para evitar errores en el console
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/data/egreso_mujeres_stem.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        const uniqueCountries = [...new Set(json.map(item => item.País__ESTANDAR))];
        setCountries(uniqueCountries);
        // Si hay países, seleccionamos el primero por defecto
        if (uniqueCountries.length > 0) setSelectedCountry(uniqueCountries[0]);
      });
  }, []);

  const filteredData = data.filter(item => item.País__ESTANDAR === selectedCountry);

  return (
    // bg-white y bordes en stone-100 para suavidad
    <div className="bg-white p-6 rounded-2xl border border-stone-100 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {/* Títulos en stone-800 (Marrón muy oscuro/Piedra) */}
          <h2 className="text-2xl font-bold text-stone-900">Evolución de Egresos STEM</h2>
          <p className="text-stone-700 text-sm italic">Filtro Invisible: Talento Femenino</p>
        </div>

        {/* Selector de Países con enfoque en Teal */}
        <select 
          className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#14b8a6] focus:border-[#14b8a6] block p-2.5 outline-none transition-all"
          value={selectedCountry || ""}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            {/* Ejes en stone-400 (#a8a29e) */}
            <XAxis 
              dataKey="year" 
              stroke="#44403c" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#44403c" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `${val}%`} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                border: '1px solid #e7e5e4', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' 
              }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Line 
              name="Mujeres Graduadas (%)"
              type="monotone" 
              dataKey="Mujeres_Egresadas" 
              // CAMBIO: Amarillo Ocre para resaltar el foco femenino
              stroke="#ca8a04" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#ca8a04', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}