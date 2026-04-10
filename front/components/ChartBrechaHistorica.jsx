"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartBrechaHistorica() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/data/grafica_comparativa_paises.json')
      .then(res => res.json())
      .then(json => {
        // Filtrar nulos
        const cleanData = json.filter(item => item.Pais !== null);
        
        // Ordenar por Año
        const sortedData = cleanData.sort((a, b) => a.Anio - b.Anio);
        setData(sortedData);
        
        // Lista de países única
        const uniqueCountries = [...new Set(sortedData.map(item => item.Pais))];
        setCountries(uniqueCountries);
        if (uniqueCountries.length > 0) setSelectedCountry(uniqueCountries[0]);
      });
  }, []);

  const filteredData = data.filter(item => item.Pais === selectedCountry);

  const años = filteredData.map(item => item.Anio);
  const minYear = años.length > 0 ? Math.min(...años) : '';
  const maxYear = años.length > 0 ? Math.max(...años) : '';

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Evolución de la Brecha {minYear && maxYear ? `(${minYear} - ${maxYear})` : ''}
          </h2>
          <p className="text-stone-700 text-sm italic">Hombres vs Mujeres en graduación STEM</p>
        </div>
        
        <select 
          className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#14b8a6] focus:border-[#14b8a6] block p-2 outline-none cursor-pointer hover:bg-stone-100 transition-colors"
          value={selectedCountry || ''}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            {/* Cuadrícula suave en stone-200 */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            
            <XAxis 
              dataKey="Anio" 
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
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' 
              }} 
              cursor={{fill: '#fcfaf9'}}
            />
            <Legend verticalAlign="top" height={36} />
            
            {/* Mujeres: Amarillo Ocre / Hombres: Verde Teal */}
            {/* He invertido el radio de las esquinas para que el redondeado se vea en la parte superior del conjunto */}
            <Bar 
              dataKey="Mujeres" 
              name="Mujeres (%)" 
              stackId="a" 
              fill="#ca8a04" 
              radius={[0, 0, 0, 0]} 
            />
            <Bar 
              dataKey="Hombres" 
              name="Hombres (%)" 
              stackId="a" 
              fill="#14b8a6" 
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}