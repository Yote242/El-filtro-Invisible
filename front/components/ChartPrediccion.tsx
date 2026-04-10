"use client";
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';

// 1. EL SALVACAÍDAS DE TYPESCRIPT: Definimos la "forma" exacta de tu JSON
interface PrediccionData {
  Pais: string;
  Anio: number;
  Matricula_Mujeres: number;
  Matricula_Hombres: number;
  Porcentaje_Directivas: number;
  Tipo_Dato: string;
}

export default function ChartPrediccion() {
  // 2. Le decimos a los estados qué tipo de datos van a almacenar
  const [data, setData] = useState<PrediccionData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('México');
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data/prediccion_filtro_invisible_2100.json')
      .then(res => res.json())
      .then((json: PrediccionData[]) => {
        const dataTo2050 = json.filter(item => item.Anio <= 2030);
        setData(dataTo2050);
        
        const uniqueCountries = Array.from(new Set(dataTo2050.map(item => item.Pais)));
        setCountries(uniqueCountries);
      })
      .catch(err => console.error("Error cargando el JSON:", err));
  }, []);

  const filteredData = data.filter(item => item.Pais === selectedCountry);

  // 3. Tipamos explícitamente los parámetros del Tooltip usando 'any' 
  // (Para evitar chocar con los tipos internos complejos de Recharts)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = payload[0].payload.Tipo_Dato === 'Predicción';
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
          <p className="font-bold text-slate-800 mb-1">Año {label}</p>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block ${isPrediction ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {isPrediction ? '🤖 Proyección IA (Modelo Ridge)' : '📊 Dato Oficial'}
          </span>
          <p className="text-pink-600 text-sm font-semibold">
            Matrícula Mujeres STEM: {payload[0].value}%
          </p>
          <p className="text-purple-600 text-sm font-semibold mt-1">
            Mujeres Directivas: {payload[1].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Agenda 2030: Proyección del Embudo
          </h2>
          <p className="text-gray-500 text-sm">Escenario tendencial basado en machine learning</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-600">País:</label>
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 block p-2 outline-none cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMatricula" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDirectivas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="Anio" stroke="#94a3b8" fontSize={12} type="number" domain={['dataMin', 'dataMax']} />
            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val}%`} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            
            {/* AQUÍ ESTÁ EL CAMBIO: x={2026} */}
            <ReferenceLine x={2026} stroke="#64748b" strokeDasharray="5 5" label={{ position: 'top', value: 'Hoy →', fill: '#64748b', fontSize: 12 }} />

            <Area type="monotone" dataKey="Matricula_Mujeres" name="Matrícula STEM (%)" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorMatricula)" />
            <Area type="monotone" dataKey="Porcentaje_Directivas" name="Puestos Directivos (%)" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorDirectivas)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}