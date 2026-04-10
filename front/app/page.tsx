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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      
      {/* Header Responsivo y Retráctil */}
      <header className={`bg-white border-b border-stone-200 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-3 shadow-md" : "py-6 sm:py-8"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            
            <div className="flex flex-col">
              {/* Badge - Oculto en móvil si hay scroll para maximizar espacio */}
              <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100 mb-2"}`}>
                <Badge className="bg-[#14b8a6]/10 text-[#0f766e] rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold border border-[#14b8a6]/20 uppercase">
                  Datatón ONU Mujeres 2026
                </Badge>
              </div>
              
              <h1 className={`font-bold text-stone-900 tracking-tight transition-all duration-300 ${isScrolled ? "text-lg sm:text-xl" : "text-2xl sm:text-4xl"}`}>
                El Filtro Invisible
              </h1>
            </div>

            {/* Texto descriptivo adaptable */}
            <div className={`transition-all duration-300 transition-opacity ${isScrolled ? "opacity-100" : "opacity-100"}`}>
              <p className={`text-stone-600 font-medium transition-all duration-300 ${
                isScrolled ? "text-[10px] sm:text-xs max-w-[150px] sm:max-w-xs sm:text-right" : "text-sm sm:text-lg max-w-xl"
              }`}>
                {isScrolled 
                  ? "Análisis de Fuga de Talento Femenino" 
                  : "Fuga de Talento Femenino en las Carreras Mejor Pagadas de México."
                }
              </p>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">
        
        {/* KPIs Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white border-stone-100 shadow-sm rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <kpi.icon className="h-5 w-5 text-[#14b8a6]" />
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${kpi.trendPositive ? "bg-[#14b8a6]/10 text-[#0f766e]" : "bg-[#ca8a04]/10 text-[#854d0e]"}`}>
                    {kpi.trend}
                  </span>
                </div>
                <CardTitle className="text-sm font-bold text-stone-500 mt-3 uppercase tracking-wider">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-stone-900">{kpi.value}</p>
                <CardDescription className="text-stone-400 text-xs mt-1">{kpi.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Storytelling Interactivo */}
        <section className="bg-white border border-stone-200 shadow-xl flex flex-col md:flex-row rounded-3xl overflow-hidden min-h-[600px]">
          <div className="w-full md:w-1/3 bg-[#0f766e] p-8 flex flex-col gap-3">
            <h3 className="text-xs font-black text-teal-100 uppercase tracking-[0.2em] mb-6 opacity-60">Exploración Narrativa</h3>
            {chartSections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-6 py-5 transition-all duration-300 font-bold text-sm rounded-2xl border ${
                  activeTab === tab.id
                    ? "bg-[#ca8a04] text-white border-[#ca8a04] shadow-lg translate-x-2"
                    : "text-teal-50 hover:bg-white/10 border-transparent"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="w-full md:w-2/3 p-8 lg:p-14 bg-white">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in slide-in-from-right-4 fade-in duration-500" : "hidden"}>
                <h3 className="text-3xl sm:text-4xl font-black text-stone-950 mb-4 tracking-tighter">{tab.title}</h3>
                <p className="text-stone-700 text-lg sm:text-xl leading-relaxed mb-10 font-medium">{tab.narrative}</p>
                <div className="bg-stone-50 rounded-3xl p-4 sm:p-6 border border-stone-100 shadow-inner">
                  {tab.component}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gráficas Base */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-3xl border-stone-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-stone-950 font-black">El Embudo de la Deserción</CardTitle>
              <CardDescription className="text-stone-700 font-medium italic">Trayectoria profesional en sectores de alto valor.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-2 sm:px-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ left: 0, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis type="number" stroke="#44403c" tick={{fill: '#44403c', fontWeight: 600, fontSize: 10}} />
                    <YAxis type="category" dataKey="stage" stroke="#44403c" tick={{fill: '#44403c', fontWeight: 600, fontSize: 10}} width={100} />
                    <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={{borderRadius: '15px'}} />
                    <Legend wrapperStyle={{paddingTop: '20px', color: '#1c1917', fontWeight: 700, fontSize: 12}} />
                    <Bar dataKey="women" name="Mujeres" stackId="a" fill="#ca8a04" />
                    <Bar dataKey="men" name="Hombres" stackId="a" fill="#14b8a6" radius={[0, 10, 10, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-stone-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-stone-950 font-black">Supervivencia Laboral</CardTitle>
              <CardDescription className="text-stone-700 font-medium italic">Retención de talento en carreras Top 50 a 15 años.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-2 sm:px-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis dataKey="year" stroke="#44403c" tick={{fill: '#44403c', fontWeight: 600, fontSize: 10}} />
                    <YAxis stroke="#44403c" tick={{fill: '#44403c', fontWeight: 600, fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '15px'}} />
                    <Legend wrapperStyle={{paddingTop: '20px', color: '#1c1917', fontWeight: 700, fontSize: 12}} />
                    <Line type="monotone" dataKey="women" name="Mujeres" stroke="#ca8a04" strokeWidth={4} dot={{r: 6, fill: "#ca8a04"}} />
                    <Line type="monotone" dataKey="men" name="Hombres" stroke="#14b8a6" strokeWidth={4} dot={{r: 6, fill: "#14b8a6"}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabla Final */}
        <div className="overflow-x-auto rounded-3xl border border-stone-100 shadow-sm">
          <Table>
            <TableHeader className="bg-stone-900">
              <TableRow className="hover:bg-stone-900 border-none">
                <TableHead className="text-white font-bold uppercase text-[10px] sm:text-xs">Rank</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] sm:text-xs">Carrera</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] sm:text-xs">Salario</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] sm:text-xs">% Mujeres</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] sm:text-xs">Brecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {careersData.map((item) => (
                <TableRow key={item.rank} className="border-b border-stone-50 hover:bg-stone-50/80 transition-colors text-[11px] sm:text-sm">
                  <TableCell className="font-bold text-stone-400">{item.rank}</TableCell>
                  <TableCell className="font-bold text-stone-800">{item.career}</TableCell>
                  <TableCell className="font-mono font-bold text-[#0f766e]">{item.salary}</TableCell>
                  <TableCell>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-bold ${parseInt(item.womenPercent) < 20 ? "bg-[#ca8a04]/10 text-[#ca8a04]" : "bg-[#14b8a6]/10 text-[#0f766e]"}`}>
                      {item.womenPercent}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-stone-600">{item.gap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </main>

      <footer className="bg-stone-900 py-12 text-center">
        <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.3em]">Fuentes: IMCO & ENOE 2026</p>
        <p className="text-stone-300 mt-2 font-black italic text-sm">MÉXICO DATA-DRIVEN JUSTICE</p>
      </footer>
    </div>
  )
}