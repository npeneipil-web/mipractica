//----
// TODOS LOS IMPORTS 
import { Other } from "../emloy-table/other"
import { EmployeeTable } from "../emloy-table";
//----


export const PresentationLetter = () => {
  const name = "Nataly";
  const now = new Date().toLocaleDateString('es-CL'); 
    return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">Sistema de Gestión - Práctica</h1>      {/* Panel de Control */}
      <div className='p-12 w-full max-w-[210mm] '>
      <Other />
      <EmployeeTable name={"Nataly"} position={"Desarrolladora"} description={"Estudiante en practica de ingenieria en informatica"}  age={25} />
      </div>
      {/* Previsualización tipo Hoja de Papel */}
      <div className="bg-white p-12 shadow-2xl border-t-[12px] border-blue-600 w-full max-w-[210mm] min-h-[150mm] transition-all">
        <div className="flex justify-between items-start mb-12">
          <div className="text-left">
            <h2 className="text-xl font-bold text-slate-800 uppercase">Borrador de Informe</h2>
            <p className="text-sm text-slate-500">Servicios Contables Profesionales</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Temuco, Chile</p>
            <p>{now}</p>
          </div>
        </div>

        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
          <p>
            Por intermedio de la presente, se deja constancia de que el/la Sr(a). 
            <span className="text-blue-700 font-bold decoration-blue-200 decoration-2 underline underline-offset-4"> {name} </span> 
            ha solicitado la revisión de sus antecedentes para la optimización de trámites tributarios correspondientes al presente periodo.
          </p>
          <p>
            El sistema ha registrado este documento de forma automática con la fecha de hoy, asegurando que el historial se mantenga actualizado según los requerimientos del departamento contable.
          </p>
        </div>

        <div className="mt-32 flex justify-center">
          <div className="border-t border-slate-400 pt-2 w-64 text-center">
            <p className="font-semibold text-slate-800">Firma Autorizada</p>
            <p className="text-xs text-slate-400">Generado por Sistema v1.0</p>
          </div>
        </div>
      </div>
    </div> )}