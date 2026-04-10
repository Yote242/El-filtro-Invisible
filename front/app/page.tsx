"use client"

import { useState, useEffect } from 'react';
import ChartEgresoMujeres from '@/components/ChartEgresoMujeres';
import ChartBrechaHistorica from '@/components/ChartBrechaHistorica';
import ChartFiltro2022 from '@/components/ChartFiltro2022';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  GraduationCap,
  Briefcase,
  TrendingDown,
  DollarSign,
  Target,
  Lightbulb,
  BarChart3,
  ChevronRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts"

// --- DATA ---
const funnelData = [
  { stage: "Matrícula", women: 48, men: 52 },
  { stage: "Egreso", women: 45, men: 55 },
  { stage: "1er Empleo", women: 36, men: 64 },
  { stage: "Mandos Medios", women: 18, men: 82 },
  { stage: "Dirección", women: 8, men: 92 },
]

const retentionData = [
  { year: "Año 1", women: 100, men: 100 },
  { year: "Año 5", women: 50, men: 82 },
  { year: "Año 10", women: 22, men: 71 },
  { year: "Año 15", women: 12, men: 65 },
]

const careersData = [
  { rank: 1, career: "Medicina de especialidad", salary: "$35,033", womenPercent: "38%", gap: "24%" },
  { rank: 2, career: "Finanzas y banca", salary: "$28,336", womenPercent: "46%", gap: "18%" },
  { rank: 3, career: "Ing. en electrónica", salary: "$22,877", womenPercent: "11%", gap: "29%" },
  { rank: 4, career: "Arquitectura y urbanismo", salary: "$22,652", womenPercent: "31%", gap: "22%" },
  { rank: 5, career: "Ing. mecánica", salary: "$21,869", womenPercent: "9%", gap: "33%" },
]

const kpiData = [
  { title: "Matrícula Top 50", value: "48%", trend: "+1%", description: "Participación inicial.", icon: GraduationCap, trendPositive: true },
  { title: "Alta Dirección", value: "8%", trend: "-1.5%", description: "Puestos C-Level.", icon: Briefcase, trendPositive: false },
  { title: "Brecha Salarial", value: "22.5%", trend: "Estan.", description: "Diferencia ingresos.", icon: TrendingDown, trendPositive: false },
  { title: "Pérdida PIB", value: "$400B", trend: "Anual", description: "Impacto exclusión.", icon: DollarSign, trendPositive: false },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("brecha");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chartSections = [
    {
      id: "brecha",
      title: "Brecha Persistente",
      subtitle: "Análisis de Datos Históricos",
      narrative: "A pesar de los avances, la distancia en las carreras mejor pagadas se mantiene estática.",
      component: <ChartBrechaHistorica />
    },
    {
      id: "egreso",
      title: "Elecciones de Egreso",
      subtitle: "Distribución por Género",
      narrative: "Observamos una exclusión sistémica en las disciplinas del top 50 de ingresos.",
      component: <ChartEgresoMujeres />
    },
    {
      id: "filtro",
      title: "Impacto Post-2022",
      subtitle: "Tendencias Recientes",
      narrative: "El mercado desplazó el talento femenino a un ritmo acelerado tras la pandemia.",
      component: <ChartFiltro2022 />
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-stone-900 selection:bg-[#14b8a6]/20">
      
      {/* HEADER */}
      <header className={`bg-white/95 backdrop-blur-md border-b border-stone-100 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 shadow-sm" : "py-6"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <Badge className="bg-teal-50 text-teal-700 rounded-full px-2 py-0.5 text-[10px] font-bold border border-teal-100 mb-1">
              ONU MUJERES 2026
            </Badge>
            <h1 className={`font-bold tracking-tight transition-all ${isScrolled ? "text-xl" : "text-2xl"}`}>
              El Filtro Invisible
            </h1>
          </div>
          <p className="text-stone-400 text-sm font-medium hidden sm:block">
            Datatón Dat4cción México.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col gap-10">
        
        {/* STORYTELLING INTERACTIVO - RÉPLICA DE LA IMAGEN */}
        <section className="bg-white rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden min-h-[600px] border border-stone-100 shadow-2xl shadow-stone-200/30 border-l-[16px] border-l-[#0f766e]">
          
          {/* Menú Lateral (Sección izquierda con borde verde integrado) */}
          <div className="w-full md:w-1/3 p-10 flex flex-col gap-4 bg-white">
            <div className="mb-8 pl-2">
              <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em]">Explorar Storyline</span>
            </div>
            
            <nav className="flex flex-col gap-4">
              {chartSections.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-4 px-6 py-6 transition-all duration-500 rounded-2xl border ${
                    activeTab === tab.id 
                      ? "bg-white border-amber-100 shadow-[0_15px_45px_-10px_rgba(202,138,4,0.18)] translate-x-1" 
                      : "bg-transparent border-transparent hover:bg-stone-50/50"
                  }`}
                >
                  {/* Indicador vertical de pestaña activa */}
                  <div className={`absolute left-0 w-1 h-6 rounded-r-full transition-all duration-300 ${
                    activeTab === tab.id ? "bg-[#ca8a04]" : "bg-transparent"
                  }`} />

                  <div className="flex flex-col items-start">
                    <span className={`text-base font-bold tracking-tight transition-colors ${
                      activeTab === tab.id ? "text-[#ca8a04]" : "text-stone-400 group-hover:text-stone-600"
                    }`}>
                      {tab.title}
                    </span>
                    <span className="text-[11px] font-medium text-stone-300 mt-0.5">
                      {tab.subtitle}
                    </span>
                  </div>
                  
                  <ChevronRight className={`ml-auto h-4 w-4 transition-all ${
                    activeTab === tab.id ? "text-[#ca8a04] translate-x-0" : "text-stone-100 opacity-0 -translate-x-2"
                  }`} />
                </button>
              ))}
            </nav>
            
            {/* Texto informativo inferior idéntico a la imagen */}
            <div className="mt-auto p-4 bg-[#f1fcfb] rounded-2xl border border-[#e6f7f5] text-center">
              <p className="text-[10px] text-[#0f766e] font-bold uppercase tracking-widest opacity-60">
                Selecciona una etapa para visualizar el filtro
              </p>
            </div>
          </div>

          {/* Área de Visualización (Sección derecha) */}
          <div className="w-full md:w-2/3 p-12 lg:p-16 bg-white border-l border-stone-50">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in fade-in duration-700" : "hidden"}>
                <div className="flex flex-col mb-10">
                   <div className="h-1 w-10 bg-[#14b8a6] rounded-full mb-6"></div>
                   <h3 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">{tab.title}</h3>
                   <p className="text-lg text-stone-400 leading-relaxed max-w-xl font-medium">
                     {tab.narrative}
                   </p>
                </div>
                
                {/* Contenedor de la gráfica con el estilo de la imagen */}
                <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-stone-50 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.04)] min-h-[400px]">
                  {tab.component}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs y Tabla (manteniendo el estilo limpio) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white shadow-sm border-stone-50 rounded-3xl p-2">
              <CardHeader className="pb-1">
                <CardTitle className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 text-stone-800">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <span className={`text-xs font-bold ${kpi.trendPositive ? "text-[#14b8a6]" : "text-[#ca8a04]"}`}>{kpi.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-[2.5rem] shadow-2xl shadow-stone-200/20 border-none overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-stone-900">
              <TableRow className="hover:bg-stone-900 border-none">
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest text-center">Rank</TableHead>
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest">Carrera Profesional</TableHead>
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest text-center">% Mujeres</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careersData.slice(0, 5).map((item) => (
                <TableRow key={item.rank} className="hover:bg-stone-50 border-b border-stone-50 transition-colors">
                  <TableCell className="font-black text-stone-200 px-10 py-6 text-xl text-center">{item.rank}</TableCell>
                  <TableCell className="font-bold text-stone-700 px-10 py-6">{item.career}</TableCell>
                  <TableCell className="px-10 py-6 text-center">
                    <span className={`px-4 py-2 rounded-full text-[11px] font-black ${parseInt(item.womenPercent) < 20 ? "bg-amber-50 text-[#ca8a04]" : "bg-teal-50 text-[#0f766e]"}`}>
                      {item.womenPercent}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

      </main>

      <footer className="py-12 text-center border-t border-stone-50">
        <p className="text-[10px] text-stone-300 font-bold uppercase tracking-[0.4em]">IMCO & ENOE 2026 • DAT4CCIÓN</p>
      </footer>
    </div>
  )
}