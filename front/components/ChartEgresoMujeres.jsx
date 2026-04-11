"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, Download } from "lucide-react"; 
import { toPng } from 'html-to-image';

export default function ChartEgresoMujeres() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const chartRef = useRef(null);

  // Detectar si es móvil para ajustar la gráfica
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    fetch('/data/egreso_mujeres_stem.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        const uniqueCountries = [...new Set(json.map(item => item.País__ESTANDAR))];
        setCountries(uniqueCountries);
        if (uniqueCountries.length > 0) setSelectedCountry(uniqueCountries[0]);
      });

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
      link.download = `egresos-stem-${selectedCountry}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error('Error:', err));
  }, [chartRef, selectedCountry]);

  const filteredData = data.filter(item => item.País__ESTANDAR === selectedCountry);

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      
      {/* HEADER RESPONSIVO */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-10 gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight">
            Evolución de Egresos STEM
          </h2>

          {/* CÁPSULA DE HERRAMIENTAS */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200 shadow-inner">
            
            <div className="relative flex items-center group">
              <div className="relative flex items-center justify-center cursor-help">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ca8a04] opacity-20 animate-ping group-hover:hidden"></span>
                <div className="relative z-10 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full border border-amber-200 text-[#ca8a04] group-hover:bg-[#ca8a04] group-hover:text-white transition-all duration-300">
                  <Info size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Tooltip Arriba */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-slate-900 text-white p-3 md:p-4 rounded-2xl shadow-2xl w-56 md:w-64 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-[#ca8a04] font-black text-[10px] uppercase tracking-[0.2em]">Metodología</span>
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-slate-200 font-medium italic">
                    Seguimiento de graduadas STEM por país y año.
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
              </div>
            </div>

            <div className="w-px h-4 bg-stone-300"></div>

            <button 
              onClick={handleDownload}
              className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full border border-teal-200 text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-all duration-300 shadow-sm"
            >
              <Download size={14} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* SELECTOR: Ancho completo en móvil */}
        <select 
          className="w-full lg:w-auto bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#0f766e] focus:border-[#0f766e] block p-2 md:p-2.5 outline-none transition-all font-bold cursor-pointer hover:bg-stone-100 shadow-sm"
          value={selectedCountry || ""}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* ÁREA DE LA GRÁFICA */}
      <div className="h-[350px] md:h-[450px] w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            
            <XAxis 
              dataKey="year" 
              stroke="#44403c" 
              fontSize={isMobile ? 10 : 12} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontWeight: 600 }} 
              label={!isMobile ? { value: "Línea de Tiempo (Años)", position: 'insideBottom', offset: -30, fill: '#64748b', fontWeight: 'bold', fontSize: 12 } : null} 
            />
            
            <YAxis 
              stroke="#44403c" 
              fontSize={isMobile ? 10 : 12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `${val}%`} 
              tick={{ fontWeight: 600 }} 
              label={!isMobile ? { value: "Graduados (%)", angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontWeight: 'bold', fontSize: 12 } : null} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }} 
            />
            
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
            
            <Line 
              name="Mujeres Graduadas (%)" 
              type="monotone" 
              dataKey="Mujeres_Egresadas" 
              stroke="#ca8a04" 
              strokeWidth={isMobile ? 3 : 4} 
              dot={{ r: isMobile ? 4 : 6, fill: '#ca8a04', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 8, stroke: '#0f766e', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}