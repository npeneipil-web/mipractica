//Definimos una interfaz Employee que describe la estructura de los datos que se van a mostrar en la tabla.

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsTrigger,
} from "@outlier-spa/component";

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
    return (
      <div className="flex mt-10">
        <p>No hay datos para mostrar</p>
      </div>
    );
  }
  const desing = "font-bold text-[15px]";
  return (
    //se muestra una tabla con los datos del empleado, cada fila de la tabla corresponde a un campo diferente (nombre, cargo, email, descripcion y edad).

    <Card className="w-100 flex mt-10 py-6 gap-6">
      <CardHeader className="text-2xl justify-center">
        <CardTitle>Información</CardTitle>
        <CardDescription>Datos ingresados</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Tabs defaultValue="overview">
            <Card>
              <CardHeader>
                <CardTitle className={desing}>Nombre</CardTitle>
                <CardDescription>{name}</CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle className={desing}>Cargo</CardTitle>
                <CardDescription>{position}</CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle className={desing}>
                  <p>Email</p>
                  {Math.PI > 4 && <p style={{ color: "#FF0000" }}>Mensaje</p>}
                  <p style={{ color: "#FF0000", display: "none" }}>Mensaje</p>
                </CardTitle>
                <CardDescription>{email}</CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle className={desing}>Descripcion</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardHeader>
                <CardTitle className={desing}>Edad</CardTitle>
                <CardDescription>{age}</CardDescription>
              </CardHeader>
            </Card>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
