"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Info, Download } from "lucide-react"; 
import { toPng } from 'html-to-image';

export default function ChartFiltro2022() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const chartRef = useRef(null);

  // Detección de móvil y carga de datos
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
      link.download = `comparativa-ingreso-egreso-${selectedYear}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error('Error al exportar:', err));
  }, [chartRef, selectedYear]);

  const filteredDataByYear = data.filter(item => item.Anio === parseInt(selectedYear));
  const chartData = filteredDataByYear.sort((a, b) => b.Ingreso_Mujeres - a.Ingreso_Mujeres);

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      
      {/* HEADER RESPONSIVO */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-10 gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight">
            Comparativa Regional: Ingreso vs Egreso
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
                  <span className="text-[#ca8a04] font-black text-[10px] uppercase tracking-[0.2em]">Filtro Invisible</span>
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-slate-200 font-medium italic">
                    La brecha entre matriculadas y graduadas indica la deserción femenina en el camino académico STEM.
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
        
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <label className="text-xs md:text-sm font-bold text-stone-600">Año:</label>
          <select 
            className="flex-grow lg:flex-grow-0 bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#0f766e] block p-2 outline-none font-bold shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ÁREA DE LA GRÁFICA */}
      <div className="h-[400px] md:h-[550px] w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ 
              top: 10, 
              right: isMobile ? 10 : 30, 
              left: isMobile ? -20 : 0, 
              bottom: isMobile ? 80 : 120 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            
            <XAxis 
              dataKey="Pais" 
              stroke="#44403c" 
              fontSize={isMobile ? 9 : 11} 
              angle={-45} 
              textAnchor="end" 
              tickLine={false}
              axisLine={false}
              tick={{ fontWeight: 600 }}
              interval={0}
              height={isMobile ? 70 : 100}
              label={!isMobile ? { 
                value: "Países de la Región", 
                position: 'insideBottom', 
                offset: -95, 
                fill: '#64748b', 
                fontWeight: 'bold',
                fontSize: 12 
              } : null}
            />
            <YAxis 
              stroke="#44403c" 
              fontSize={isMobile ? 10 : 12} 
              tickLine={false}
              axisLine={false}
              tick={{ fontWeight: 600 }}
              tickFormatter={(val) => `${val}%`} 
              label={!isMobile ? { 
                value: "Participación (%)", 
                angle: -90, 
                position: 'insideLeft', 
                offset: 10, 
                fill: '#64748b', 
                fontWeight: 'bold',
                fontSize: 12 
              } : null}
            />
            
            <Tooltip 
              cursor={{fill: '#fcfaf9'}} 
              contentStyle={{ 
                backgroundColor: '#fff',
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: isMobile ? '10px' : '12px'
              }} 
            />
            <Legend 
              verticalAlign="top" 
              height={isMobile ? 30 : 45} 
              wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
            />
            
            <Bar 
              dataKey="Ingreso_Mujeres" 
              name="Matriculadas (%)" 
              fill="#0f766e" 
              radius={[4, 4, 0, 0]} 
              barSize={isMobile ? 12 : 20}
            />
            <Bar 
              dataKey="Egreso_Mujeres" 
              name="Graduadas (%)" 
              fill="#ca8a04" 
              radius={[4, 4, 0, 0]} 
              barSize={isMobile ? 12 : 20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}