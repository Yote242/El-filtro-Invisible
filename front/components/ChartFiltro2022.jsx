"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartFiltro2022() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch('/data/grafica3_filtro_invisible_historico.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        const uniqueYears = [...new Set(json.map(item => item.Anio))].sort();
        setYears(uniqueYears);
        
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[uniqueYears.length - 1].toString());
        }
      });
  }, []);

  const filteredDataByYear = data.filter(item => item.Anio === parseInt(selectedYear));
  const chartData = filteredDataByYear.sort((a, b) => b.Ingreso_Mujeres - a.Ingreso_Mujeres);

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      
      {/* Cabecera y Menú Desplegable */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Comparativa Regional: Ingreso vs Egreso
          </h2>
          <p className="text-stone-700 text-sm italic">Visualización del Filtro Invisible en STEM</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-stone-600">Año:</label>
          <select 
            className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#14b8a6] focus:border-[#14b8a6] block p-2 outline-none cursor-pointer hover:bg-stone-100 transition-colors"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gráfica de Barras Agrupadas */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            
            <XAxis 
              dataKey="Pais" 
              stroke="#44403c" 
              fontSize={11} 
              angle={-45} 
              textAnchor="end" 
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
              cursor={{fill: '#fcfaf9'}} 
              contentStyle={{ 
                backgroundColor: '#fff',
                borderRadius: '12px', 
                border: '1px solid #e7e5e4', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' 
              }} 
            />
            <Legend verticalAlign="top" height={36} />
            
            {/* Matriculadas en Verde Teal (Base) / Graduadas en Amarillo Ocre (Foco) */}
            <Bar 
              dataKey="Ingreso_Mujeres" 
              name="Matriculadas (%)" 
              fill="#14b8a6" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
            <Bar 
              dataKey="Egreso_Mujeres" 
              name="Graduadas (%)" 
              fill="#ca8a04" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}