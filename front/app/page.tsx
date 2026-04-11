"use client"

import { useState, useEffect } from 'react';
import ChartEgresoMujeres from '@/components/ChartEgresoMujeres';
import ChartBrechaHistorica from '@/components/ChartBrechaHistorica';
import ChartFiltro2022 from '@/components/ChartFiltro2022';
import ChartPrediccion from '@/components/ChartPrediccion'; 
import ChartImpactoMujeres from '@/components/ChartImpactoMujeres'; 
import MapaInteractivo from '@/components/MapaInteractivo';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// --- INTERFACES PARA TYPESCRIPT (Esto quita las líneas rojas) ---
interface PaisData {
  Pais: string;
  Anio: number | string;
  Matricula_Mujeres: number;
  Mapa_Name: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("brecha");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Definimos que el estado es un arreglo de PaisData
  const [tableData, setTableData] = useState<PaisData[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    fetch('/data/mapa_matriculacion.json')
      .then(res => res.json())
      .then((json: PaisData[]) => {
        const sorted = json.sort((a, b) => b.Matricula_Mujeres - a.Matricula_Mujeres);
        setTableData(sorted);
      })
      .catch(err => console.error("Error al cargar datos:", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredData = selectedCountry 
    ? tableData.filter(item => item.Pais === selectedCountry)
    : tableData;

  const chartSections = [
    { id: "brecha", title: "La Ilusión del Progreso:Años de estancamiento.", narrative: "El tiempo pasa, la brecha permanece. Si las políticas de inclusión actuales estuvieran funcionando a un ritmo adecuado, esta gráfica debería mostrar una línea de convergencia clara año con año. Sin embargo, la evolución histórica (2015-2023) nos cuenta una historia de resistencia estructural.", component: <ChartBrechaHistorica /> },
    { id: "filtro", title: "La Fuga Silenciosa: Quién entra y quién logra salir de las carreras del futuro.", narrative: "Tradicionalmente, las políticas públicas se han centrado en incentivar a que más mujeres elijan estudiar carreras STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). Sin embargo, esta visualización revela una falla sistémica más profunda: el problema no es solo quién entra, sino quién logra quedarse.", component: <ChartFiltro2022 /> },
    { id: "egreso", title: "El Reloj Detenido: La verdadera velocidad del talento femenino.", narrative: "Cuando analizamos el progreso de las mujeres en STEM, es fácil caer en el optimismo de los números absolutos de ingreso. Sin embargo, al observar la evolución del porcentaje de egreso efectivo a lo largo de los años, nos encontramos con una curva de crecimiento dolorosamente plana o, en el mejor de los casos, marginal.", component: <ChartEgresoMujeres /> },
    { id: "impacto", title: "¿Paga la educación? El retorno desigual del talento femenino.", narrative: "Este análisis nos demuestra que la educación por sí sola no es la cura. Para que el retorno educativo sea justo, necesitamos políticas que acompañen el talento femenino en el mercado laboral remunerado, asegurando que cada año de esfuerzo en las aulas se refleje peso a peso en sus salarios.", component: <ChartImpactoMujeres /> },
    { id: "prediccion", title: "Romper la Inercia:Por qué el 2030 no bastará.", narrative: "Esta proyección es una advertencia matemática: el tiempo por sí solo no rompe techos de cristal ni desactiva el Filtro Invisible. Si mantenemos la trayectoria actual, llegaremos a la meta de los Objetivos de Desarrollo Sostenible de la ONU con aulas más diversas, pero con las mismas mesas directivas excluyentes. Para alterar esta curva hacia el 2030, la intervención ya no debe enfocarse solo en convencer a las niñas de estudiar ciencias, sino en auditar y transformar agresivamente las políticas de retención y promoción corporativa.", component: <ChartPrediccion /> }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-stone-900 selection:bg-[#14b8a6]/20">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-t-[12px] border-t-[#0f766e] bg-white ${
        isScrolled ? "py-2 shadow-md" : "py-6 shadow-xl"
      }`}>
        <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-6 bg-white rounded-2xl px-4 py-2 border border-stone-100 shadow-sm">
            <div className="flex flex-col border-r border-stone-100 pr-4">
              <Badge className="bg-teal-50 text-teal-700 rounded-full px-2 py-0.5 text-[12px] font-bold border border-teal-100 mb-1">
                Datatón 2026
              </Badge>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                 <h1 className={`font-black tracking-tight text-slate-950 transition-all ${isScrolled ? "text-xl" : "text-2xl"}`}>
                  El Filtro Invisible
                 </h1>
                 <Badge className="bg-amber-100 text-amber-700 rounded-lg px-2 py-0.5 text-[9px] font-black border border-amber-200 uppercase">
                   América Latina y el Caribe
                 </Badge>
              </div>
            </div>
          </div>
          <p className="text-slate-800 text-xs font-bold uppercase tracking-widest hidden lg:block opacity-60">
            Dat4cción 2026
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 pt-44 pb-20 flex flex-col gap-10">
        
        {/* KPIs y PROPÓSITOS (Se mantienen igual) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Propósito", d: "Imaginar un futuro donde el talento femenino impulse la economía.", i: Target, bg: "bg-stone-50", ic: "text-stone-600" },
            { t: "Impacto Humano", d: "Transformar la vida de las mujeres para crear bienestar común.", i: Lightbulb, bg: "bg-amber-50/50", ic: "text-amber-600" },
            { t: "Metodología", d: "Convertimos datos oficiales en predicciones fáciles de entender.", i: BarChart3, bg: "bg-teal-50/50", ic: "text-teal-600" }
          ].map((f, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border-2 border-stone-50 shadow-sm hover:shadow-lg transition-all">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${f.bg} ${f.ic} rounded-2xl mb-6 shadow-sm`}>
                  <f.i className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-2">{f.t}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-semibold">{f.d}</p>
            </div>
          ))}
        </section>

        {/* DASHBOARD */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[750px] border border-stone-100">
          <aside className="w-full md:w-80 p-10 flex flex-col bg-white border-r border-stone-100">
            <div className="mb-10 pl-4 border-l-4 border-[#0f766e]">
              <span className="text-[10px] font-black text-[#0f766e] uppercase tracking-[0.3em] mb-1 block">EXPLORACIÓN</span>
              <h4 className="text-xl font-bold text-slate-900 leading-tight">Analiza por etapa</h4>
            </div>
            <nav className="flex flex-col gap-6">
              {chartSections.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative text-left py-4 px-8 transition-all duration-300 text-sm font-bold tracking-tight rounded-xl ${
                    activeTab === tab.id ? "text-[#ca8a04] bg-white shadow-lg border border-stone-50" : "text-slate-400"
                  }`}
                >
                  {activeTab === tab.id && <div className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-[#ca8a04] rounded-full" />}
                  {tab.title}
                </button>
              ))}
            </nav>
          </aside>

          <section className="flex-grow p-14 bg-white">
            {chartSections.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "block animate-in fade-in duration-500" : "hidden"}>
                <div className="mb-10">
                   <div className="h-1 w-12 bg-[#14b8a6] rounded-full mb-6"></div>
                   <h2 className="text-5xl font-black text-slate-950 mb-4 tracking-tighter">{tab.title}</h2>
                   <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{tab.narrative}</p>
                </div>
                <div className="bg-[#fcfcfc] rounded-[2.5rem] p-10 border border-stone-50 shadow-inner min-h-[580px]">
                   {tab.component}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* MAPA */}
        <MapaInteractivo onCountryClick={setSelectedCountry} />

        {/* TABLA DINÁMICA */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end px-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Análisis Real por País</h3>
            {selectedCountry && (
              <button onClick={() => setSelectedCountry(null)} className="text-[10px] font-black text-[#ca8a04] uppercase border-b-2 border-amber-200">
                Limpiar filtro: {selectedCountry}
              </button>
            )}
          </div>
          <Card className="rounded-[3rem] shadow-xl border border-stone-100 overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-slate-950">
                <TableRow>
                  <TableHead className="h-16 text-white uppercase text-[10px] font-black text-center">Rank</TableHead>
                  <TableHead className="h-16 text-white uppercase text-[10px] font-black text-left">País / Región</TableHead>
                  <TableHead className="h-16 text-white uppercase text-[10px] font-black text-center">Año</TableHead>
                  <TableHead className="h-16 text-white uppercase text-[10px] font-black text-center">% Matriculación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-stone-50 transition-colors">
                    <TableCell className="font-black text-slate-200 text-3xl text-center py-6">{index + 1}</TableCell>
                    <TableCell className="font-bold text-slate-800 py-6">{item.Pais}</TableCell>
                    <TableCell className="text-center font-bold text-slate-500">{item.Anio}</TableCell>
                    <TableCell className="text-center py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${item.Matricula_Mujeres < 30 ? "bg-amber-50 text-[#ca8a04]" : "bg-teal-50 text-[#0f766e]"}`}>
                        {item.Matricula_Mujeres}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* CONCLUSIÓN */}
        <section className="py-20 px-10 bg-[#0f766e] rounded-[3rem] text-center shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-teal-400/20 text-teal-100 border-none mb-6 px-4 py-1 text-xs uppercase tracking-widest font-bold">
              Conclusión del Análisis
            </Badge>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
               La igualdad no es solo una meta social,<br className="hidden md:block" /> 
              <span className="text-amber-400">es el motor del bien común</span>
            </h2>
            <p className="text-base md:text-xl text-teal-50/80 font-medium leading-relaxed">
              Cuando el talento femenino lidera en tecnología y dirección, el PIB crece y las familias prosperan.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f766e] py-16 text-center text-teal-50 font-black uppercase tracking-[0.4em] text-[10px]">
        Universidad Politécnica de Puebla • 2026
      </footer>
    </div>
  )
}