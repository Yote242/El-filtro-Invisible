"use client"

import { useState, useEffect } from 'react';
import ChartEgresoMujeres from '@/components/ChartEgresoMujeres';
import ChartBrechaHistorica from '@/components/ChartBrechaHistorica';
import ChartFiltro2022 from '@/components/ChartFiltro2022';
import ChartPrediccion from '@/components/ChartPrediccion'; 
import ChartImpactoMujeres from '@/components/ChartImpactoMujeres'; 
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
} from "lucide-react"
import {
  ResponsiveContainer,
} from "recharts"

// --- DATA ---
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
      title: "La Ilusión del Progreso:Años de estancamiento",
      subtitle: "Análisis Histórico",
      narrative: "El tiempo pasa, la brecha permanece. Si las políticas de inclusión actuales estuvieran funcionando a un ritmo adecuado, esta gráfica debería mostrar una línea de convergencia clara año con año. Sin embargo, la evolución histórica (2015-2023) nos cuenta una historia de resistencia estructural.",
      component: <ChartBrechaHistorica />
    },
    {
      id: "filtro",
      title: "La Fuga Silenciosa: Quién entra y quién logra salir de las carreras del futuro.",
      subtitle: "Ingreso vs Egreso",
      narrative: "Tradicionalmente, las políticas públicas se han centrado en incentivar a que más mujeres elijan estudiar carreras STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). Sin embargo, esta visualización revela una falla sistémica más profunda: el problema no es solo quién entra, sino quién logra quedarse.",
      component: <ChartFiltro2022 />
    },
    {
      id: "egreso",
      title: "El Reloj Detenido: La verdadera velocidad del talento femenino",
      subtitle: "Distribución por Género",
      narrative: "Cuando analizamos el progreso de las mujeres en STEM, es fácil caer en el optimismo de los números absolutos de ingreso. Sin embargo, al observar la evolución del porcentaje de egreso efectivo a lo largo de los años, nos encontramos con una curva de crecimiento dolorosamente plana o, en el mejor de los casos, marginal.",
      component: <ChartEgresoMujeres />
    },
    {
      id: "impacto",
      title: "¿Paga la educación? El retorno desigual del talento femenino.",
      subtitle: "Retorno del Talento",
      narrative: "Este análisis nos demuestra que la educación por sí sola no es la cura. Para que el retorno educativo sea justo, necesitamos políticas que acompañen el talento femenino en el mercado laboral remunerado, asegurando que cada año de esfuerzo en las aulas se refleje peso a peso en sus salarios.",
      component: <ChartImpactoMujeres />
    },
    {
      id: "prediccion",
      title: "Romper la Inercia:Por qué el 2030 no bastará.",
      subtitle: "Machine Learning",
      narrative: "Esta proyección es una advertencia matemática: el tiempo por sí solo no rompe techos de cristal ni desactiva el Filtro Invisible. Si mantenemos la trayectoria actual, llegaremos a la meta de los Objetivos de Desarrollo Sostenible de la ONU con aulas más diversas, pero con las mismas mesas directivas excluyentes. Para alterar esta curva hacia el 2030, la intervención ya no debe enfocarse solo en convencer a las niñas de estudiar ciencias, sino en auditar y transformar agresivamente las políticas de retención y promoción corporativa.",
      component: <ChartPrediccion />
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-stone-900 selection:bg-[#14b8a6]/20">
      
      {/* HEADER RESPONSIVO */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-t-[8px] md:border-t-[12px] border-t-[#0f766e] bg-white ${
        isScrolled ? "py-2 shadow-md" : "py-4 md:py-6 shadow-xl shadow-stone-200/40"
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-500 bg-white border border-stone-100 rounded-2xl px-4 md:px-6 py-2 md:py-3 flex items-center gap-4 ${
              !isScrolled ? "shadow-sm border-[#14b8a6]/10" : "border-transparent"
            }`}>
              <div className="flex flex-col">
                <Badge className="bg-teal-50 text-teal-700 rounded-full px-2 py-0.5 text-[8px] md:text-[9px] font-bold border border-teal-100 mb-0.5 w-fit">
                  Datatón 2026
                </Badge>
                <h1 className={`font-black tracking-tight text-slate-950 transition-all ${isScrolled ? "text-base md:text-lg" : "text-xl md:text-2xl"}`}>
                  El Filtro Invisible
                </h1>
              </div>
            </div>
            <p className="text-slate-800 text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:block opacity-60 text-right">
              América Latina y el Caribe
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-12 flex flex-col gap-8 md:gap-10">
        
        {/* CARDS PROPÓSITO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { t: "Propósito", d: "Imaginar un futuro donde el talento femenino impulse la economía.", i: Target, bgColor: "bg-stone-50", iconColor: "text-stone-600", accent: "border-stone-100" },
            { t: "Impacto Humano", d: "Transformar la vida de las mujeres para crear bienestar común.", i: Lightbulb, bgColor: "bg-amber-50/50", iconColor: "text-amber-600", accent: "border-amber-100/50" },
            { t: "Metodología", d: "Convertimos datos oficiales en predicciones fáciles de entender.", i: BarChart3, bgColor: "bg-teal-50/50", iconColor: "text-teal-600", accent: "border-teal-100/50" }
          ].map((f, idx) => (
            <div key={idx} className={`group bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 ${f.accent} shadow-sm transition-all`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 ${f.bgColor} ${f.iconColor} rounded-2xl mb-4 md:mb-6`}>
                  <f.i className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-950 mb-2 tracking-tight">{f.t}</h3>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-semibold">{f.d}</p>
            </div>
          ))}
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="bg-white shadow-sm border-stone-100 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6">
              <CardHeader className="p-0 pb-2 md:p-0 md:pb-4 flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-stone-200" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-baseline gap-1 md:gap-2">
                  <p className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter">{kpi.value}</p>
                  <span className={`text-[10px] md:text-xs font-bold ${kpi.trendPositive ? "text-[#14b8a6]" : "text-[#ca8a04]"}`}>{kpi.trend}</span>
                </div>
                <p className="text-[9px] md:text-[11px] text-slate-600 mt-1 md:mt-2 font-semibold line-clamp-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* DASHBOARD PRINCIPAL RESPONSIVO */}
        <section className="bg-white rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row overflow-hidden border border-stone-100 shadow-2xl border-l-[10px] md:border-l-[20px] border-l-[#0f766e]">
          
          {/* SIDEBAR / TABS */}
          <div className="w-full md:w-[25%] lg:w-[22%] p-6 md:p-10 flex flex-col gap-4 bg-stone-50/30 md:bg-white border-b md:border-b-0 md:border-r border-stone-100">
            <div className="mb-4 md:mb-10 pl-4 md:pl-6 relative">
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0f766e] rounded-full" />
              <span className="text-[9px] md:text-[10px] font-black text-[#0f766e] uppercase tracking-[0.3em] mb-1 block">Exploración</span>
              <h4 className="text-sm md:text-[18px] font-bold text-slate-900 leading-snug">Selecciona una etapa</h4>
            </div>
            
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {chartSections.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 group relative flex items-center gap-4 px-4 md:px-6 py-3 md:py-5 transition-all duration-300 rounded-xl md:rounded-2xl border ${
                    activeTab === tab.id 
                      ? "bg-white border-amber-100 shadow-md md:translate-x-1" 
                      : "bg-transparent border-transparent text-stone-400"
                  }`}
                >
                  <div className={`hidden md:block absolute left-0 w-1 h-6 rounded-r-full transition-all ${
                    activeTab === tab.id ? "bg-[#ca8a04]" : "bg-transparent"
                  }`} />
                  <span className={`text-xs md:text-[14px] font-bold tracking-tight whitespace-nowrap ${
                    activeTab === tab.id ? "text-[#ca8a04]" : "group-hover:text-stone-600"
                  }`}>
                    {tab.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* CONTENEDOR DE GRÁFICAS */}
          <div className="w-full md:w-[75%] lg:w-[78%] p-6 md:p-10 lg:p-14 bg-white flex flex-col">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "flex flex-col h-full animate-in fade-in duration-500" : "hidden"}>
                <div className="flex flex-col mb-6">
                   <div className="h-1 w-10 bg-[#14b8a6] rounded-full mb-4"></div>
                   <h3 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tight mb-2">{tab.title}</h3>
                   <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-3xl font-medium line-clamp-3 md:line-clamp-none">
                     {tab.narrative}
                   </p>
                </div>

                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 border border-stone-50 shadow-sm flex-grow min-h-[400px] md:min-h-[550px] flex items-center justify-center">
                  <div className="w-full h-full">
                    {tab.component}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NUEVA SECCIÓN: TEXTO LLAMATIVO (REEMPLAZA LAS GRÁFICAS EXTRAS) */}
        <section className="py-12 md:py-20 px-6 md:px-10 bg-[#0f766e] rounded-[2rem] md:rounded-[3rem] text-center shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-teal-400/20 text-teal-100 border-none mb-6 px-4 py-1 text-xs uppercase tracking-widest font-bold">
              Conclusión del Análisis
            </Badge>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight md:leading-none mb-8">
               La igualdad no es solo una meta social,<br className="hidden md:block" /> 
              <span className="text-amber-400">es el motor del bien común</span>
            </h2>
            <p className="text-base md:text-xl text-teal-50/80 font-medium leading-relaxed mb-10">
              Cuando el talento femenino lidera en tecnología y dirección, el PIB crece, las familias prosperan 
              y el futuro de la región deja de estar a medias.
            </p>
            
          </div>
        </section>

        {/* TABLA: MANTENIDA AL FINAL */}
        <Card className="rounded-[1.5rem] md:rounded-[3rem] shadow-xl border-none overflow-x-auto bg-white">
          <Table className="min-w-[600px]">
            <TableHeader className="bg-stone-900">
              <TableRow className="hover:bg-stone-900">
                <TableHead className="h-16 px-6 text-white uppercase text-[9px] tracking-widest text-center">Rank</TableHead>
                <TableHead className="h-16 px-6 text-white uppercase text-[9px] tracking-widest text-left">Carrera Profesional</TableHead>
                <TableHead className="h-16 px-6 text-white uppercase text-[9px] tracking-widest text-center">% Mujeres</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careersData.map((item) => (
                <TableRow key={item.rank} className="border-b border-stone-50">
                  <TableCell className="font-black text-slate-300 px-6 py-6 text-xl text-center">{item.rank}</TableCell>
                  <TableCell className="font-bold text-slate-900 px-6 py-6 text-sm md:text-base text-left">{item.career}</TableCell>
                  <TableCell className="px-6 py-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black ${parseInt(item.womenPercent) < 20 ? "bg-amber-50 text-[#ca8a04]" : "bg-teal-50 text-[#0f766e]"}`}>
                      {item.womenPercent}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

      </main>

      <footer className="bg-[#0f766e] py-10 md:py-16 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-white text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] mb-4">Universidad Politécnica de Puebla</p>
          <p className="text-teal-100/60 text-[9px] md:text-[11px] font-bold tracking-widest uppercase">2026 • DAT4CCIÓN</p>
        </div>
      </footer>
    </div>
  )
}