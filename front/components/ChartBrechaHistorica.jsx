"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Info, Download } from "lucide-react"; 
import { toPng } from 'html-to-image';

export default function ChartBrechaHistorica() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  
  // Referencia para la descarga de la gráfica
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('/data/grafica_comparativa_paises.json')
      .then(res => res.json())
      .then(json => {
        const cleanData = json.filter(item => item.Pais !== null);
        const sortedData = cleanData.sort((a, b) => a.Anio - b.Anio);
        setData(sortedData);
        
        const uniqueCountries = [...new Set(sortedData.map(item => item.Pais))];
        setCountries(uniqueCountries);
        if (uniqueCountries.length > 0) setSelectedCountry(uniqueCountries[0]);
      });
  }, []);

  // Función de descarga
  const handleDownload = useCallback(() => {
    if (chartRef.current === null) return;
    toPng(chartRef.current, { 
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: { padding: '20px', borderRadius: '16px' }
    })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `brecha-historica-${selectedCountry || 'latam'}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error('Error al descargar:', err));
  }, [chartRef, selectedCountry]);

  const filteredData = data.filter(item => item.Pais === selectedCountry);

  const años = filteredData.map(item => item.Anio);
  const minYear = años.length > 0 ? Math.min(...años) : '';
  const maxYear = años.length > 0 ? Math.max(...años) : '';

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 w-full h-full shadow-sm">
      
      {/* HEADER CON TÍTULO Y CÁPSULA DE HERRAMIENTAS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Evolución de la Brecha {minYear && maxYear ? `(${minYear} - ${maxYear})` : ''}
          </h2>

          {/* CÁPSULA DE HERRAMIENTAS SEPARADA */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200 shadow-inner">
            
            {/* TOKEN DE INFO: Tooltip hacia ARRIBA */}
            <div className="relative flex items-center group">
              <div className="relative flex items-center justify-center cursor-help">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ca8a04] opacity-20 animate-ping group-hover:hidden"></span>
                <div className="relative z-10 flex items-center justify-center w-7 h-7 bg-white rounded-full border border-amber-200 text-[#ca8a04] group-hover:bg-[#ca8a04] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Info size={15} strokeWidth={3} />
                </div>
              </div>

              {/* Tooltip reubicado arriba para evitar conflictos de clic */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl w-64 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-[#ca8a04] font-black text-[10px] uppercase tracking-[0.2em]">Nota Metodológica</span>
                  <p className="text-[11px] leading-relaxed text-slate-200 font-medium italic">
                    Comparativa histórica entre hombres y mujeres graduados en STEM.
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
              </div>
            </div>

            {/* SEPARADOR VISUAL */}
            <div className="w-px h-4 bg-stone-300"></div>

            {/* BOTÓN DE DESCARGA */}
            <button 
              onClick={handleDownload}
              title="Descargar Imagen"
              className="flex items-center justify-center w-7 h-7 bg-white rounded-full border border-teal-200 text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-all duration-300 shadow-sm group"
            >
              <Download size={15} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        <select 
          className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-[#0f766e] focus:border-[#0f766e] block p-2 outline-none cursor-pointer hover:bg-stone-100 transition-colors font-bold shadow-sm"
          value={selectedCountry || ''}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* ÁREA DE LA GRÁFICA CON REFERENCIA */}
      <div className="h-[400px] w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={filteredData} 
            margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
            
            <XAxis 
              dataKey="Anio" 
              stroke="#44403c" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontWeight: 600 }}
              label={{ 
                value: "Línea de Tiempo (Años)", 
                position: 'insideBottom', 
                offset: -40,
                fill: '#64748b', 
                fontWeight: 'bold',
                fontSize: 12 
              }}
            />
            
            <YAxis 
              stroke="#44403c" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `${val}%`} 
              tick={{ fontWeight: 600 }}
              label={{ 
                value: "Graduados (%)", 
                angle: -90, 
                position: 'insideLeft', 
                offset: -20,
                fill: '#64748b', 
                fontWeight: 'bold',
                fontSize: 12 
              }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
              }} 
              cursor={{fill: '#fcfaf9'}}
            />
            
            <Legend verticalAlign="top" height={40} />
            
            <Bar dataKey="Mujeres" name="Mujeres (%)" stackId="a" fill="#ca8a04" />
            <Bar dataKey="Hombres" name="Hombres (%)" stackId="a" fill="#0f766e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}