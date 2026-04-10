"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import { Info, Download } from "lucide-react";
import { toPng } from 'html-to-image';

interface ImpactoData {
  Pais: string;
  retorno_educativo: number;
  Relacion_salarial: number;
  Tiempo_Remunerado: number;
  Porcentaje_Directivas: number;
}

export default function ChartImpactoMujeres() {
  const [data, setData] = useState<ImpactoData[]>([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('/data/impacto_mujeres.json')
      .then(res => res.json())
      .then((json: ImpactoData[]) => setData(json))
      .catch(err => console.error("Error cargando el JSON de impacto:", err));
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
      link.download = `impacto-salarial-mujeres.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.error('Error al exportar:', err));
  }, [chartRef]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const countryData = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 min-w-[200px]">
          <p className="font-bold text-slate-800 text-lg mb-2 border-b pb-1">{countryData.Pais}</p>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-600">
              Eficiencia Educativa: <span className="text-[#0f766e]">{countryData.retorno_educativo}</span>
            </p>
            <p className="text-sm font-bold text-slate-600">
              Relación Salarial: <span className={countryData.Relacion_salarial >= 1 ? "text-[#0f766e]" : "text-rose-600"}>
                {countryData.Relacion_salarial}
              </span>
            </p>
            <p className="text-sm font-bold text-slate-600">
              Mujeres Directivas: <span className="text-[#ca8a04]">{countryData.Porcentaje_Directivas}%</span>
            </p>
            <p className="text-sm font-bold text-slate-600">
              Tiempo Remunerado: <span className="text-slate-500">{countryData.Tiempo_Remunerado} hrs</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full h-full shadow-sm">
      
      {/* HEADER CON TÍTULO Y CÁPSULA DE HERRAMIENTAS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            Impacto del Trabajo Remunerado en Mujeres
          </h2>

          <div className="flex items-center gap-3 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-200 shadow-inner">
            {/* TOKEN DE INFO: Tooltip hacia ARRIBA */}
            <div className="relative flex items-center group">
              <div className="relative flex items-center justify-center cursor-help">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ca8a04] opacity-20 animate-ping group-hover:hidden"></span>
                <div className="relative z-10 flex items-center justify-center w-7 h-7 bg-white rounded-full border border-amber-200 text-[#ca8a04] group-hover:bg-[#ca8a04] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Info size={15} strokeWidth={3} />
                </div>
              </div>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl w-72 border border-white/10 backdrop-blur-md text-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[#ca8a04] font-black text-[10px] uppercase tracking-[0.2em]">Nota Metodológica</span>
                  <p className="text-[11px] leading-relaxed text-slate-200 font-medium italic">
                    Análisis de eficiencia educativa vs paridad salarial. El tamaño de burbuja representa el % de mujeres en cargos directivos.
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
              </div>
            </div>

            <div className="w-px h-4 bg-stone-300"></div>

            {/* BOTÓN DE DESCARGA */}
            <button 
              onClick={handleDownload}
              title="Descargar Gráfica"
              className="flex items-center justify-center w-7 h-7 bg-white rounded-full border border-teal-200 text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-all duration-300 shadow-sm group"
            >
              <Download size={15} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[500px] w-full" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 80, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            
            <XAxis 
              type="number" 
              dataKey="retorno_educativo" 
              name="Eficiencia" 
              stroke="#94a3b8" 
              fontSize={12} 
              tick={{ fill: '#64748b', fontWeight: 600 }}
              domain={['auto', 'auto']}
              label={{ 
                value: "Eficiencia Educativa (Salario / Años Estudio)", 
                position: 'insideBottom', 
                offset: -55, 
                fill: '#475569', 
                fontWeight: 'bold',
                fontSize: 13
              }}
            />
            
            <YAxis 
              type="number" 
              dataKey="Relacion_salarial" 
              name="Relación Salarial" 
              stroke="#94a3b8" 
              fontSize={12}
              tick={{ fill: '#64748b', fontWeight: 600 }}
              domain={['auto', 'auto']}
              label={{ 
                value: "Relación Salarial (Mujer / Hombre)", 
                angle: -90, 
                position: 'center', 
                dx: -55, 
                fill: '#475569', 
                fontWeight: 'bold',
                fontSize: 13
              }}
            />
            
            <ZAxis 
              type="number" 
              dataKey="Porcentaje_Directivas" 
              range={[60, 450]} 
              name="% Directivas" 
            />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            
            <ReferenceLine 
              y={1.0} 
              stroke="#ca8a04" 
              strokeDasharray="5 5" 
              strokeWidth={2}
              label={{ position: 'top', value: 'Meta: Paridad (1.0)', fill: '#ca8a04', fontSize: 12, fontWeight: 'bold' }} 
            />

            <Scatter name="Países" data={data} fill="#0f766e" fillOpacity={0.6}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} stroke="#064e3b" strokeWidth={1} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}