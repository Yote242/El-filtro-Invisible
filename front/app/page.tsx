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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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
      
      {/* HEADER CON DISEÑO DE CARD FLOTANTE Y BORDE VERDE SUPERIOR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-t-[12px] border-t-[#0f766e] bg-white ${
        isScrolled ? "py-2 shadow-md" : "py-6 shadow-xl shadow-stone-200/40"
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-500 bg-white border border-stone-100 rounded-2xl px-6 py-3 flex items-center gap-4 ${
              !isScrolled ? "shadow-[0_10px_30px_-10px_rgba(15,118,110,0.12)] border-[#14b8a6]/10 translate-y-1" : "border-transparent"
            }`}>
              <div className="flex flex-col">
                <Badge className="bg-teal-50 text-teal-700 rounded-full px-2 py-0.5 text-[9px] font-bold border border-teal-100 mb-0.5 w-fit">
                  Datatón regional para la igualdad 2026
                </Badge>
                <h1 className={`font-black tracking-tight text-slate-950 transition-all ${isScrolled ? "text-lg" : "text-2xl"}`}>
                  El Filtro Invisible
                </h1>
              </div>
              {!isScrolled && <div className="h-8 w-px bg-stone-100 hidden md:block" />}
              {!isScrolled && (
                <p className="text-[11px] font-bold text-[#ca8a04] uppercase tracking-widest hidden md:block">
                 Trabajo remunerado
                </p>
              )}
            </div>

            <p className="text-slate-800 text-xs font-bold uppercase tracking-widest hidden lg:block opacity-60">
              América Latina y el Caribe
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-44 pb-12 flex flex-col gap-12">
        
        {/* 1. SECCIÓN: FUNDAMENTOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Propósito", d: "Mapeamos el acceso a la riqueza en las 50 carreras con mejores salarios promedio en México.", i: Target, bgColor: "bg-stone-50", iconColor: "text-stone-600", accent: "border-stone-100" },
            { t: "Impacto Humano", d: "Evidencia clara para enfocar políticas de retención y acompañamiento en mandos medios y dirección.", i: Lightbulb, bgColor: "bg-amber-50/50", iconColor: "text-amber-600", accent: "border-amber-100/50" },
            { t: "Metodología", d: "Cruce de microdatos del IMCO con modelos de Análisis de Supervivencia y tecnologías ágiles.", i: BarChart3, bgColor: "bg-teal-50/50", iconColor: "text-teal-600", accent: "border-teal-100/50" }
          ].map((f, idx) => (
            <div key={idx} className={`group relative bg-white p-6 rounded-3xl border ${f.accent} shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-11 h-11 ${f.bgColor} ${f.iconColor} rounded-xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <f.i className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2 tracking-tight">{f.t}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-semibold">{f.d}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 2. SECCIÓN: KPIs */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white shadow-sm border-stone-100 rounded-3xl p-4">
              <CardHeader className="p-0 pb-2 flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-stone-200" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-slate-950 tracking-tighter">{kpi.value}</p>
                  <span className={`text-xs font-bold ${kpi.trendPositive ? "text-[#14b8a6]" : "text-[#ca8a04]"}`}>{kpi.trend}</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-1 font-semibold">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 3. SECCIÓN: STORYTELLING INTERACTIVO */}
        <section className="bg-white rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden min-h-[600px] border border-stone-200 shadow-2xl shadow-stone-200/30 border-l-[16px] border-l-[#0f766e]">
        {/* Menú Lateral */}
<div className="w-full md:w-1/3 p-10 flex flex-col gap-4 bg-white border-r border-stone-50">
  
  {/* ENCABEZADO EDITORIAL (NO PARECE BOTÓN) */}
  <div className="mb-10 pl-6 relative">
    {/* Línea de acento sutil pero firme */}
    <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0f766e] rounded-full" />
    
    
    
    <h4 className="text-[18px] font-bold text-[#0f766e] leading-snug tracking-tight max-w-[180px]">
      Selecciona una etapa para visualizar el análisis
    </h4>
    
    {/* Decoración horizontal mínima para romper la forma de "caja" */}
    <div className="h-[3px] w-8 bg-[#0f766e] mt-4 opacity-100" />
  </div>
  
  <nav className="flex flex-col gap-2">
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
        <div className={`absolute left-0 w-1 h-6 rounded-r-full transition-all duration-300 ${
          activeTab === tab.id ? "bg-[#ca8a04]" : "bg-transparent"
        }`} />
        <div className="flex flex-col items-start">
          <span className={`text-base font-bold tracking-tight transition-colors ${
            activeTab === tab.id ? "text-[#ca8a04]" : "text-stone-400 group-hover:text-stone-600"
          }`}>
            {tab.title}
          </span>
          <span className="text-[12px] font-medium text-stone-700 mt-0.5">{tab.subtitle}</span>
        </div>
        <ChevronRight className={`ml-auto h-4 w-4 transition-all ${
          activeTab === tab.id ? "text-[#ca8a04] translate-x-0" : "text-stone-100 opacity-0 -translate-x-2"
        }`} />
      </button>
    ))}
  </nav>
</div>

          <div className="w-full md:w-2/3 p-12 lg:p-16 bg-white">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in fade-in duration-700" : "hidden"}>
                <div className="flex flex-col mb-10">
                   <div className="h-1 w-10 bg-[#14b8a6] rounded-full mb-6"></div>
                   <h3 className="text-4xl font-bold text-slate-950 tracking-tight mb-4">{tab.title}</h3>
                   <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-medium">{tab.narrative}</p>
                </div>
                <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-stone-50 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.04)] min-h-[400px]">
                  {tab.component}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECCIÓN: GRÁFICAS DE SOPORTE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { t: "Embudo de Deserción", d: "Trayectoria en sectores de alto valor.", data: funnelData, type: 'bar' },
            { t: "Supervivencia Laboral", d: "Retención estimada a 15 años.", data: retentionData, type: 'line' }
          ].map((chart, i) => (
            <Card key={i} className="rounded-[2rem] shadow-sm border-stone-50 p-6 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold tracking-tight text-slate-950">{chart.t}</CardTitle>
                <CardDescription className="text-sm font-semibold text-slate-700">{chart.d}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chart.type === 'bar' ? (
                      <BarChart data={chart.data} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="stage" type="category" tick={{fontSize: 11, fill: '#1e293b', fontWeight: 600}} width={95} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                        <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 700}} />
                        <Bar dataKey="women" name="Mujeres" stackId="a" fill="#ca8a04" barSize={22} />
                        <Bar dataKey="men" name="Hombres" stackId="a" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={22} />
                      </BarChart>
                    ) : (
                      <LineChart data={chart.data} margin={{ right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{fontSize: 11, fill: '#1e293b', fontWeight: 600}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 11, fill: '#1e293b', fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(v)=>`${v}%`} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                        <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 700}} />
                        <Line type="monotone" dataKey="women" name="Mujeres" stroke="#ca8a04" strokeWidth={4} dot={{r: 5, fill: '#ca8a04'}} activeDot={{r: 7}} />
                        <Line type="monotone" dataKey="men" name="Hombres" stroke="#14b8a6" strokeWidth={4} dot={{r: 5, fill: '#14b8a6'}} activeDot={{r: 7}} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 5. SECCIÓN: TABLA DE CARRERAS */}
        <Card className="rounded-[2.5rem] shadow-2xl shadow-stone-200/20 border-none overflow-hidden bg-white mb-10">
          <Table>
            <TableHeader className="bg-stone-900">
              <TableRow className="hover:bg-stone-900 border-none">
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest text-center">Rank</TableHead>
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest text-left">Carrera Profesional</TableHead>
                <TableHead className="font-bold h-16 px-10 text-white uppercase text-[10px] tracking-widest text-center">% Mujeres</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careersData.map((item) => (
                <TableRow key={item.rank} className="hover:bg-stone-50 border-b border-stone-100 transition-colors">
                  <TableCell className="font-black text-slate-300 px-10 py-6 text-xl text-center">{item.rank}</TableCell>
                  <TableCell className="font-bold text-slate-900 px-10 py-6 text-left">{item.career}</TableCell>
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

      {/* FOOTER PERSONALIZADO */}
      <footer className="bg-[#0f766e] py-14 text-center border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-white text-[12px] font-black uppercase tracking-[0.4em] mb-3">
            Universidad Politécnica de Puebla
          </p>
          <div className="h-px w-16 bg-[#ca8a04] mx-auto mb-4" />
          <p className="text-teal-100/60 text-[10px] font-bold tracking-widest uppercase">
            2026 • DAT4CCIÓN
          </p>
        </div>
      </footer>
    </div>
  )
}