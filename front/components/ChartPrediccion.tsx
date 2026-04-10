"use client"

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Datos extraídos de tu JSON de predicción
const data = [
  { year: 2024, egreso: 48.2, brecha: 22.5, pib: 12.4 },
  { year: 2030, egreso: 48.8, brecha: 21.8, pib: 45.2 },
  { year: 2040, egreso: 49.3, brecha: 20.2, pib: 110.5 },
  { year: 2050, egreso: 49.7, brecha: 18.5, pib: 195.8 },
  { year: 2075, egreso: 50.4, brecha: 12.4, pib: 480.2 },
  { year: 2100, egreso: 51.2, brecha: 4.2, pib: 890.5 },
];

const ChartPrediccion = () => {
  return (
    <div className="w-full h-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ca8a04]" />
            <span className="text-[10px] font-bold text-slate-600 uppercase">Brecha Salarial (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0f766e]" />
            <span className="text-[10px] font-bold text-slate-600 uppercase">Participación Mujeres (%)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEgreso" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBrecha" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ca8a04" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ca8a04" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="egreso" 
            name="Participación"
            stroke="#0f766e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorEgreso)" 
          />
          <Area 
            type="monotone" 
            dataKey="brecha" 
            name="Brecha Salarial"
            stroke="#ca8a04" 
            strokeWidth={3}
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorBrecha)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
        <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
          <span className="font-bold">Nota del Modelo:</span> La paridad total (brecha {`<`} 5%) se estima alcanzar hasta el año <span className="font-bold">2092</span> si se mantienen las políticas actuales de incentivos STEM.
        </p>
      </div>
    </div>
  );
};

export default ChartPrediccion;