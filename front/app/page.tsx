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
  Users,
  Building2,
  Target,
  Lightbulb,
  BarChart3,
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

// --- DATA MOCKUPS ---
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
      narrative: "A pesar de los avances, la distancia en las carreras mejor pagadas se mantiene estática.",
      component: <ChartBrechaHistorica />
    },
    {
      id: "egreso",
      title: "Elecciones de Egreso",
      narrative: "Observamos una exclusión sistémica en las disciplinas del top 50 de ingresos.",
      component: <ChartEgresoMujeres />
    },
    {
      id: "filtro",
      title: "Impacto Post-2022",
      narrative: "El mercado desplazó el talento femenino a un ritmo acelerado tras la pandemia.",
      component: <ChartFiltro2022 />
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-[#14b8a6]/20">
      
      {/* HEADER EQUILIBRADO */}
      <header className={`bg-white/95 backdrop-blur-md border-b border-stone-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 shadow-sm" : "py-6"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <Badge className={`bg-teal-50 text-teal-700 rounded-full px-2 py-0.5 text-[10px] font-bold border border-teal-100 mb-1 ${isScrolled ? "hidden" : "block"}`}>
              ONU MUJERES 2026
            </Badge>
            <h1 className={`font-bold tracking-tight transition-all ${isScrolled ? "text-xl" : "text-2xl"}`}>
              El Filtro Invisible
            </h1>
          </div>
          <p className="text-stone-500 text-sm font-medium hidden sm:block max-w-xs text-right leading-tight">
            Análisis de Fuga de Talento Femenino en STEM México.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col gap-10">
        
        {/* SECCIÓN: FUNDAMENTOS CON DISEÑO PREMIUM */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Propósito", d: "Mapeamos el acceso a la riqueza en las 50 carreras mejor pagadas de México.", i: Target, bgColor: "bg-stone-100", iconColor: "text-stone-600", accent: "border-stone-200" },
            { t: "Impacto Humano", d: "Evidencia para enfocar políticas de retención en mandos medios y dirección.", i: Lightbulb, bgColor: "bg-amber-50", iconColor: "text-amber-600", accent: "border-amber-200" },
            { t: "Metodología", d: "Cruce de microdatos IMCO con modelos de Análisis de Supervivencia y tecnologías ágiles.", i: BarChart3, bgColor: "bg-teal-50", iconColor: "text-teal-600", accent: "border-teal-200" }
          ].map((f, idx) => (
            <div key={idx} className={`group relative bg-white p-6 rounded-3xl border ${f.accent} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${f.bgColor} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${f.bgColor} ${f.iconColor} rounded-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <f.i className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 tracking-tight">{f.t}</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-medium">{f.d}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${f.iconColor.replace('text', 'bg')}`} />
            </div>
          ))}
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white shadow-sm border-none rounded-2xl">
              <CardHeader className="p-4 pb-1">
                <CardTitle className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <span className={`text-xs font-bold ${kpi.trendPositive ? "text-teal-600" : "text-amber-600"}`}>{kpi.trend}</span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1 font-medium">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* STORYTELLING INTERACTIVO */}
        <section className="bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row rounded-3xl overflow-hidden min-h-[500px]">
          <div className="w-full md:w-1/4 bg-[#0f766e] p-6 flex flex-col gap-2">
            <h3 className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-6 opacity-60">Navegación</h3>
            {chartSections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-3.5 transition-all font-bold text-sm rounded-xl ${
                  activeTab === tab.id ? "bg-[#ca8a04] text-white shadow-md scale-[1.02]" : "text-teal-50 hover:bg-white/10"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="w-full md:w-3/4 p-8 bg-white">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in fade-in slide-in-from-right-2 duration-300" : "hidden"}>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">{tab.title}</h3>
                <p className="text-base text-stone-600 mb-8 font-medium">{tab.narrative}</p>
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 min-h-[350px]">
                  {tab.component}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GRÁFICAS BASE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { t: "Embudo de Deserción", d: "Trayectoria en sectores de alto valor.", data: funnelData, type: 'bar' },
            { t: "Supervivencia Laboral", d: "Retención estimada a 15 años.", data: retentionData, type: 'line' }
          ].map((chart, i) => (
            <Card key={i} className="rounded-2xl shadow-sm border-none p-2 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">{chart.t}</CardTitle>
                <CardDescription className="text-sm font-medium">{chart.d}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chart.type === 'bar' ? (
                      <BarChart data={chart.data} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="stage" type="category" tick={{fontSize: 11, fill: '#44403c', fontWeight: 600}} width={90} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                        <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 700}} />
                        <Bar dataKey="women" name="Mujeres" stackId="a" fill="#ca8a04" barSize={22} />
                        <Bar dataKey="men" name="Hombres" stackId="a" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={22} />
                      </BarChart>
                    ) : (
                      <LineChart data={chart.data} margin={{ right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{fontSize: 11, fill: '#44403c', fontWeight: 600}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 11, fill: '#44403c', fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(v)=>`${v}%`} />
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

        {/* TABLA DE CARRERAS */}
        <Card className="rounded-2xl shadow-sm border-none overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-stone-900">
              <TableRow>
                <TableHead className="text-white font-bold h-12 px-6">RANK</TableHead>
                <TableHead className="text-white font-bold h-12 px-6">CARRERA</TableHead>
                <TableHead className="text-white font-bold h-12 px-6">SALARIO PROM.</TableHead>
                <TableHead className="text-white font-bold h-12 px-6">% MUJERES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careersData.map((item) => (
                <TableRow key={item.rank} className="hover:bg-stone-50 border-b border-stone-100 transition-colors">
                  <TableCell className="font-bold text-stone-400 px-6 py-4">{item.rank}</TableCell>
                  <TableCell className="font-bold text-stone-800 px-6 py-4">{item.career}</TableCell>
                  <TableCell className="font-mono text-teal-700 font-bold px-6 py-4">{item.salary}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${parseInt(item.womenPercent) < 20 ? "bg-amber-50 text-amber-700" : "bg-teal-50 text-teal-700"}`}>
                      {item.womenPercent}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

      </main>

      <footer className="py-12 text-center border-t border-stone-200 bg-white">
        <p className="text-xs text-stone-400 font-bold uppercase tracking-[0.2em]">IMCO & ENOE 2026 • DAT4CCIÓN</p>
        <p className="text-[10px] text-stone-300 font-bold mt-2">ONU MUJERES MÉXICO</p>
      </footer>
    </div>
  )
}