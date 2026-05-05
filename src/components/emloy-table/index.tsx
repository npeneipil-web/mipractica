import { useEffect, useState } from "react";

//Definimos una interfaz Employee que describe la estructura de los datos que se van a mostrar en la tabla.
//  Esta interfaz incluye campos como name, position, description, email y age.
interface Employee {
  name: string;
  position: string;
  description: string;
  email?: string;
  age?: number;
}
export const Otro = () => <>otro</>;
//Este componente es una tabla que va a recibir por parametro los campos tipo nombre un cargo y descripcion
export const EmployeeTable: React.FC<Employee> = ({
  name,
  position,
  description,
  email,
  age,
}) => {
  // const [message, setMessage] = useState<string>("");
  // useEffect(() => {
  //   if (!email) {
  //     setMessage("Email es requerido");
  //     return;
  //   }
  //   if (email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  //     const message = ``;
  //     setMessage(message);
  //   } else {
  //     setMessage("El email no es valido");
  //   }
  // }, [email]);
  console.log({ name, position, description, email, age });
  //si no hay datos para mostrar, es decir, si todos los campos son vacios, se muestra un mensaje indicando que no hay datos para mostrar.
  if (!email && !name && !position && !description && !age) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    //se muestra una tabla con los datos del empleado, cada fila de la tabla corresponde a un campo diferente (nombre, cargo, email, descripcion y edad).
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-md mb-10">
      <table>
        <tbody>
          <tr>
            <td className="font-bold text-[18px]">Nombre</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Cargo</td>
            <td>{position}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">
              <p>Email</p>
              {Math.PI > 4 && <p style={{ color: "#FF0000" }}>Mensaje</p>}
              <p style={{ color: "#FF0000", display: "none" }}>Mensaje</p>
            </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Descripcion</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Edad</td>
            <td>{age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
