"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Info, Download } from "lucide-react";
import { toPng } from 'html-to-image';

interface PrediccionData {
  Pais: string;
  Anio: number;
  Matricula_Mujeres: number;
  Matricula_Hombres: number;
  Porcentaje_Directivas: number;
  Tipo_Dato: string;
}

export default function ChartPrediccion() {
  const [data, setData] = useState<PrediccionData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('México');
  const [countries, setCountries] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const chartRef = useRef<HTMLDivElement>(null);

  // Detección de móvil y carga de datos
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetch('/data/prediccion_filtro_invisible_2100.json')
      .then(res => res.json())
      .then((json: PrediccionData[]) => {
        const dataTo2030 = json.filter(item => item.Anio <= 2030);
        setData(dataTo2030);
        
        const uniqueCountries = Array.from(new Set(dataTo2030.map(item => item.Pais)));
        setCountries(uniqueCountries);
      })
      .catch(err => console.error("Error cargando el JSON:", err));

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = useCallback(() => {
    if (chartRef.current === null) return;
    toPng(chartRef.current, { 
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: { padding: '20px', borderRadius: '16px' }
    })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `proyeccion-2030-${selectedCountry}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error('Error al exportar:', err));
  }, [chartRef, selectedCountry]);

  const filteredData = data.filter(item => item.Pais === selectedCountry);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = payload[0].payload.Tipo_Dato === 'Predicción';
      return (
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg border border-slate-100">
          <p className="font-bold text-slate-800 mb-1 text-sm md:text-base">Año {label}</p>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full mb-2 inline-block ${isPrediction ? 'bg-amber-100 text-[#ca8a04]' : 'bg-teal-100 text-[#0f766e]'}`}>
            {isPrediction ? '🤖 Proyección IA' : '📊 Dato Oficial'}
          </span>
          <div className="space-y-1">
            <p className="text-[#0f766e] text-xs md:text-sm font-bold">
              Matrícula: {payload[0].value}%
            </p>
            <p className="text-[#ca8a04] text-xs md:text-sm font-bold">
              Directivas: {payload[1].value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      
      {/* HEADER RESPONSIVO */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-10 gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            Agenda 2030: Proyección
          </h2>

          {/* CÁPSULA DE HERRAMIENTAS */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200 shadow-inner">
            <div className="relative flex items-center group">
              <div className="relative flex items-center justify-center cursor-help">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ca8a04] opacity-20 animate-ping group-hover:hidden"></span>
                <div className="relative z-10 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full border border-amber-200 text-[#ca8a04] group-hover:bg-[#ca8a04] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Info size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Tooltip Arriba */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-slate-900 text-white p-3 md:p-4 rounded-2xl shadow-2xl w-56 md:w-72 border border-white/10 backdrop-blur-md text-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[#ca8a04] font-black text-[10px] uppercase tracking-[0.2em]">IA & Proyecciones</span>
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-slate-200 font-medium italic">
                    Modelo Ridge para estimar tendencias futuras basadas en microdatos.
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
              </div>
            </div>

            <div className="w-px h-4 bg-stone-300"></div>

            <button 
              onClick={handleDownload}
              title="Descargar Gráfica"
              className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full border border-teal-200 text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-all duration-300 shadow-sm group"
            >
              <Download size={14} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        <select 
          className="w-full lg:w-auto bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#0f766e] block p-2 outline-none font-bold shadow-sm"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* ÁREA DE LA GRÁFICA */}
      <div className="h-[350px] md:h-[400px] w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: isMobile ? -20 : 0, bottom: 40 }}>
            <defs>
              <linearGradient id="colorMatricula" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDirectivas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ca8a04" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ca8a04" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
  dataKey="Anio" 
  stroke="#94a3b8" 
  fontSize={isMobile ? 10 : 12} 
  type="number" 
  domain={['dataMin', 'dataMax']} 
  tick={{ fontWeight: 600 }} 
  // Corrección: Validamos que solo se pase el objeto si NO es móvil
  label={!isMobile ? { 
    value: "Línea de Tiempo (Años)", 
    position: 'insideBottom', 
    offset: -10, // Ajustado para que no se encime con los números
    fill: '#64748b', 
    fontWeight: 'bold', 
    fontSize: 12 
  } : undefined} // Usar undefined es más seguro que null
/>

<YAxis 
  stroke="#94a3b8" 
  fontSize={isMobile ? 10 : 12} 
  tickFormatter={(val) => `${val}%`} 
  domain={[0, 100]} 
  tick={{ fontWeight: 600 }} 
  // Corrección: Ajustamos posición y usamos undefined
  label={!isMobile ? { 
    value: "Participación (%)", 
    angle: -90, 
    position: 'insideLeft', 
    offset: 15, 
    fill: '#64748b', 
    fontWeight: 'bold', 
    fontSize: 12 
  } : undefined}
/>

            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle" 
              wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} 
            />
            
            <ReferenceLine 
              x={2026} 
              stroke="#64748b" 
              strokeDasharray="5 5" 
              label={{ position: 'top', value: isMobile ? 'Hoy' : 'Hoy →', fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} 
            />

            <Area 
              type="monotone" 
              dataKey="Matricula_Mujeres" 
              name="Matrícula (%)" 
              stroke="#0f766e" 
              strokeWidth={isMobile ? 2 : 3} 
              fillOpacity={1} 
              fill="url(#colorMatricula)" 
            />
            <Area 
              type="monotone" 
              dataKey="Porcentaje_Directivas" 
              name="Directivas (%)" 
              stroke="#ca8a04" 
              strokeWidth={isMobile ? 2 : 3} 
              fillOpacity={1} 
              fill="url(#colorDirectivas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}