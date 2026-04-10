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
  { stage: "Egreso Titulado", women: 45, men: 55 },
  { stage: "Primer Empleo Formal", women: 36, men: 64 },
  { stage: "Mandos Medios", women: 18, men: 82 },
  { stage: "Alta Dirección", women: 8, men: 92 },
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
  { title: "Mujeres en Matrícula Top 50", value: "48%", trend: "+1% vs 2020", description: "Participación inicial.", icon: GraduationCap, trendPositive: true },
  { title: "Mujeres en Alta Dirección", value: "8%", trend: "-1.5% vs 2020", description: "Caída en puestos C-Level.", icon: Briefcase, trendPositive: false },
  { title: "Brecha Salarial (Top 50)", value: "22.5%", trend: "Estancada", description: "Diferencia de ingresos.", icon: TrendingDown, trendPositive: false },
  { title: "Pérdida de PIB Estimada", value: "$400B MXN", trend: "Anual", description: "Impacto por exclusión.", icon: DollarSign, trendPositive: false },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("brecha");
  const [isScrolled, setIsScrolled] = useState(false);

  // Lógica para detectar el scroll sin causar bucles de redimensionamiento
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chartSections = [
    {
      id: "brecha",
      title: "Una Brecha Persistente",
      narrative: "A pesar de los avances, la distancia en las carreras mejor pagadas se mantiene estática. Esta gráfica invita a reflexionar sobre la resistencia estructural en los sectores de mayor riqueza.",
      component: <ChartBrechaHistorica />
    },
    {
      id: "egreso",
      title: "Las Elecciones de Egreso",
      narrative: "El desafío no es solo el acceso, sino la distribución. Observamos una dolorosa exclusión sistémica en las disciplinas del top 50 de ingresos.",
      component: <ChartEgresoMujeres />
    },
    {
      id: "filtro",
      title: "El Impacto Post-2022",
      narrative: "El año 2022 marcó un punto de inflexión profundo. El mercado operó de manera agresiva desplazando el talento femenino a un ritmo acelerado.",
      component: <ChartFiltro2022 />
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-[#14b8a6]/20 selection:text-stone-900">
      
      {/* HEADER FIXED: Eliminamos el bug de salto usando fixed en lugar de sticky */}
      <header className={`bg-white/95 backdrop-blur-sm border-b border-stone-200 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? "py-2 shadow-md" : "py-6 sm:py-10"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            
            <div className="flex flex-col">
              <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100 mb-2"}`}>
                <Badge className="bg-[#14b8a6]/10 text-[#0f766e] rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold border border-[#14b8a6]/20 uppercase">
                  Datatón ONU Mujeres 2026
                </Badge>
              </div>
              
              <h1 className={`font-black text-stone-900 tracking-tighter transition-all duration-500 ${isScrolled ? "text-lg sm:text-2xl" : "text-3xl sm:text-5xl"}`}>
                El Filtro Invisible
              </h1>
            </div>

            <p className={`text-stone-600 font-bold transition-all duration-500 ${
              isScrolled ? "text-[10px] sm:text-sm max-w-[200px] sm:max-w-xs sm:text-right" : "text-sm sm:text-xl max-w-xl"
            }`}>
              {isScrolled 
                ? "Análisis de Fuga de Talento Femenino" 
                : "Fuga de Talento Femenino en las Carreras Mejor Pagadas de México."
              }
            </p>

          </div>
        </div>
      </header>

      {/* MAIN: Añadimos un padding-top (pt) generoso para compensar el header fixed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-64 pb-10 flex flex-col gap-16">
        
        {/* KPIs Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white border-stone-100 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <kpi.icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${kpi.trendPositive ? "bg-[#14b8a6]/10 text-[#0f766e]" : "bg-[#ca8a04]/10 text-[#854d0e]"}`}>
                    {kpi.trend}
                  </span>
                </div>
                <CardTitle className="text-xs font-black text-stone-400 mt-4 uppercase tracking-[0.15em]">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black text-stone-900 tracking-tighter">{kpi.value}</p>
                <CardDescription className="text-stone-500 text-sm mt-2 font-medium">{kpi.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Storytelling Interactivo con Menú en Contraste */}
        <section className="bg-white border border-stone-200 shadow-2xl flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden min-h-[650px]">
          {/* Sidebar Oscuro */}
          <div className="w-full md:w-1/3 bg-[#0f766e] p-10 flex flex-col gap-4">
            <h3 className="text-xs font-black text-teal-100 uppercase tracking-[0.3em] mb-8 opacity-50">Navegación</h3>
            {chartSections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-8 py-6 transition-all duration-300 font-bold text-base rounded-[1.5rem] border-2 ${
                  activeTab === tab.id
                    ? "bg-[#ca8a04] text-white border-[#ca8a04] shadow-xl translate-x-3 scale-105"
                    : "text-teal-50 hover:bg-white/5 border-transparent hover:translate-x-1"
                }`}
              >
                {tab.title}
              </button>
            ))}
            <div className="mt-auto pt-10 border-t border-teal-800">
              <p className="text-[10px] text-teal-300 font-bold uppercase tracking-widest opacity-40 italic">Insight Engine v2.0</p>
            </div>
          </div>

          {/* Área de Gráficas */}
          <div className="w-full md:w-2/3 p-10 lg:p-16 bg-white">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in slide-in-from-bottom-4 fade-in duration-700" : "hidden"}>
                <h3 className="text-4xl sm:text-5xl font-black text-stone-950 mb-6 tracking-tighter">{tab.title}</h3>
                <p className="text-stone-700 text-xl sm:text-2xl leading-snug mb-12 font-medium max-w-2xl">{tab.narrative}</p>
                <div className="bg-stone-50/50 rounded-[2rem] p-6 sm:p-10 border border-stone-100 shadow-inner">
                  {tab.component}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gráficas Secundarias con Rótulos Oscuros */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Funnel Chart */}
          <Card className="rounded-[2.5rem] border-stone-100 shadow-xl overflow-hidden bg-white">
            <CardHeader className="bg-stone-50/50 p-8 border-b border-stone-100">
              <CardTitle className="text-stone-950 font-black text-2xl tracking-tight">El Embudo de la Deserción</CardTitle>
              <CardDescription className="text-stone-700 font-bold italic text-base">Trayectoria profesional en sectores de alto valor.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis type="number" stroke="#1c1917" tick={{fill: '#44403c', fontWeight: 700, fontSize: 12}} axisLine={false} />
                    <YAxis type="category" dataKey="stage" stroke="#1c1917" tick={{fill: '#44403c', fontWeight: 700, fontSize: 11}} width={120} axisLine={false} />
                    <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                    <Legend wrapperStyle={{paddingTop: '30px', color: '#1c1917', fontWeight: 800}} />
                    <Bar dataKey="women" name="Mujeres" stackId="a" fill="#ca8a04" barSize={35} />
                    <Bar dataKey="men" name="Hombres" stackId="a" fill="#14b8a6" radius={[0, 10, 10, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Retention Chart */}
          <Card className="rounded-[2.5rem] border-stone-100 shadow-xl overflow-hidden bg-white">
            <CardHeader className="bg-stone-50/50 p-8 border-b border-stone-100">
              <CardTitle className="text-stone-950 font-black text-2xl tracking-tight">Supervivencia Laboral</CardTitle>
              <CardDescription className="text-stone-700 font-bold italic text-base">Retención de talento en carreras Top 50 a 15 años.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis dataKey="year" stroke="#1c1917" tick={{fill: '#44403c', fontWeight: 700}} axisLine={false} />
                    <YAxis stroke="#1c1917" tick={{fill: '#44403c', fontWeight: 700}} axisLine={false} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                    <Legend wrapperStyle={{paddingTop: '30px', color: '#1c1917', fontWeight: 800}} />
                    <Line type="monotone" dataKey="women" name="Mujeres" stroke="#ca8a04" strokeWidth={5} dot={{r: 8, fill: "#ca8a04", strokeWidth: 3, stroke: "#fff"}} activeDot={{r: 10}} />
                    <Line type="monotone" dataKey="men" name="Hombres" stroke="#14b8a6" strokeWidth={5} dot={{r: 8, fill: "#14b8a6", strokeWidth: 3, stroke: "#fff"}} activeDot={{r: 10}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabla de Carreras */}
        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl overflow-hidden">
          <div className="p-8 bg-stone-900 flex justify-between items-center">
             <h3 className="text-white font-black text-xl uppercase tracking-widest">Directorio de Empleabilidad Top 50</h3>
             <Badge className="bg-[#ca8a04] text-white border-none px-4">Actualizado 2026</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-stone-50">
                <TableRow className="border-none">
                  <TableHead className="text-stone-900 font-black uppercase text-xs p-6">Rank</TableHead>
                  <TableHead className="text-stone-900 font-black uppercase text-xs p-6">Carrera Profesional</TableHead>
                  <TableHead className="text-stone-900 font-black uppercase text-xs p-6">Salario Promedio</TableHead>
                  <TableHead className="text-stone-900 font-black uppercase text-xs p-6">% Representación Femenina</TableHead>
                  <TableHead className="text-stone-900 font-black uppercase text-xs p-6">Brecha de Ingresos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {careersData.map((item) => (
                  <TableRow key={item.rank} className="border-b border-stone-50 hover:bg-stone-50/50 transition-all duration-300 group">
                    <TableCell className="font-black text-stone-300 text-lg p-6 group-hover:text-[#ca8a04]">{item.rank}</TableCell>
                    <TableCell className="font-bold text-stone-800 p-6">{item.career}</TableCell>
                    <TableCell className="font-mono font-black text-[#0f766e] text-lg p-6">{item.salary}</TableCell>
                    <TableCell className="p-6">
                      <span className={`px-4 py-2 rounded-xl text-xs font-black shadow-sm ${parseInt(item.womenPercent) < 20 ? "bg-[#ca8a04]/10 text-[#ca8a04]" : "bg-[#14b8a6]/10 text-[#0f766e]"}`}>
                        {item.womenPercent}
                      </span>
                    </TableCell>
                    <TableCell className="font-black text-stone-600 p-6">{item.gap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      </main>

      <footer className="bg-stone-950 py-20 text-center border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-stone-500 text-xs font-black uppercase tracking-[0.5em] mb-6">Metodología Basada en IMCO & ENOE</p>
          <div className="flex justify-center gap-8 mb-10 opacity-30">
             <div className="h-8 w-8 bg-stone-500 rounded-full"></div>
             <div className="h-8 w-8 bg-stone-500 rounded-full"></div>
             <div className="h-8 w-8 bg-stone-500 rounded-full"></div>
          </div>
          <p className="text-stone-200 text-2xl font-black italic tracking-tighter">DAT4CCIÓN: MÉXICO DATA-DRIVEN JUSTICE 2026</p>
        </div>
      </footer>
    </div>
  )
}