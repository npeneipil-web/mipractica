// la interfaz Information define la estructura de los datos que se van a mostrar en la tabla,
// en este caso, el nombre, apellido y edad
interface Information {
  name: string;
  lastName: string;
  age: number;
}
//este componente es una tabla que va a recibir por parametro los campos tipo nombre, apellido y edad
export const InformationTable: React.FC<Information> = ({
  name,
  lastName,
  age,
}) => {
  //si no hay datos para mostrar, es decir, si todos los campos son vacios, se muestra un mensaje indicando que no hay datos para mostrar
  if (!name && !lastName && !age) {
    return <p>No hay datos para mostrar</p>;
  }
  // De lo contrario, se muestra una tabla con los datos del empleado
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-md mb-10">
      <table>
        <tbody>
          <tr>
            <td className="font-bold text-[18px]">Nombre</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Apellido</td>
            <td>{lastName}</td>
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
